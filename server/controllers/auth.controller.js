import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { transporter } from "../utils/mailer.util.js";



const registerUser = asyncHandler(async (req, res) => {
    const { username, email, fullName, password, role } = req.body;

    if (!username || !email || !fullName || !password) {
        throw new ApiError(400, "All fields are required");
    }


    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
        throw new ApiError(409, "User already exists");
    }

    const allowedRoles = ["user", "admin"];
    const userRole = allowedRoles.includes(role) ? role : "user";
    const newUser = await User.create({
        username,
        email,
        fullName,
        password,
        role: userRole
    });

    const accessToken = newUser.generateAccessToken();
    const refreshToken = newUser.generateRefreshToken();

    newUser.refreshToken = refreshToken;
    await newUser.save({ validateBeforeSave: false });

    res
        .status(201)
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 15 * 60 * 1000,
        })
        .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json(
            new ApiResponse(201, {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                fullName: newUser.fullName,
                role: newUser.role,
            }, "User registered successfully")
        );
});

const loginUser = asyncHandler(async (req, res) => {
    const { emailOrUsername, password } = req.body;

    if (req.cookies?.accessToken) {
        throw new ApiError(400, "User already logged in");
    }

    if (!emailOrUsername || !password) {
        throw new ApiError(400, "Both fields are required");
    }

    const user = await User.findOne({
        $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user || !(await user.isPasswordCorrect(password))) {
        throw new ApiError(401, "Invalid credentials");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    res
        .status(200)
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 15 * 60 * 1000,
        })
        .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json(
            new ApiResponse(200, {
                _id: user._id,
                username: user.username,
                email: user.email,
                fullName: user.fullName,
                role: user.role,
            }, "Login successful")
        );
});

const logoutUser = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
        return res
            .status(200)
            .json(new ApiResponse(200, null, "User already logged out"));
    }

    const user = await User.findOne({ refreshToken });
    if (user) {
        user.refreshToken = null;
        await user.save({ validateBeforeSave: false });
    }

    res
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .status(200)
        .json(new ApiResponse(200, null, "User logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingToken = req.cookies?.refreshToken;
    if (!incomingToken) {
        throw new ApiError(401, "Refresh token missing");
    }

    const decoded = jwt.verify(
        incomingToken,
        process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decoded._id);
    if (!user || user.refreshToken !== incomingToken) {
        throw new ApiError(401, "Invalid refresh token");
    }

    const newAccessToken = user.generateAccessToken();

    res
        .cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 15 * 60 * 1000,
        })
        .status(200)
        .json(new ApiResponse(200, null, "Access token refreshed"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
    // Fetch user from DB using ID from JWT payload (set by verifyJWT middleware)
    const user = await User.findById(req.user._id).select("-password -refreshToken");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Return the user (without sensitive data)
    res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
});


const forgotPasswordController = asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) throw new ApiError(400, "Email is required");

    const user = await User.findOne({ email });
    if (!user) throw new ApiError(404, "User not found");

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    // Send Email
    await transporter.sendMail({
        from: `"PizzaScript Support" <${process.env.SMTP_USER}>`,
        to: user.email,
        subject: "Reset Your Password - PizzaScript 🍕",
        html: `
      <h2>Hello ${user.fullName},</h2>
      <p>You recently requested to reset your PizzaScript password.</p>
      <p>Click the link below to reset your password. This link will expire in 1 hour:</p>
      <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #ef4444; color: white; border-radius: 5px; text-decoration: none;">Reset Password</a>
      <p>If you didn't request this, you can ignore this email.</p>
      <br/>
      <p>🍕 With love,</p>
      <strong>Team PizzaScript</strong>
    `,
    });

    res.json(new ApiResponse(200, {}, "Password reset link sent to your email."));
});

const resetPassword = asyncHandler(async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) throw new ApiError(400, "Invalid or expired token");

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json(new ApiResponse(200, {}, "Password reset successful"));
});


export {
    loginUser,
    logoutUser,
    registerUser,
    getCurrentUser,
    refreshAccessToken,
    forgotPasswordController,
    resetPassword
}