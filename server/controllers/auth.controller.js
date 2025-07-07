import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

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

export {
    loginUser,
    logoutUser,
    registerUser,
    getCurrentUser,
    refreshAccessToken
}