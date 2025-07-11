import { asyncHandler } from "../utils/asyncHandler.js";
import { OTP } from "../models/otp.model.js";
import { transporter } from "../utils/mailer.util.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const sendOtp = asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) throw new ApiError(400, "Email is required");

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    await OTP.create({
        email,
        otp: otpCode,
        expiresAt: Date.now() + 10 * 60 * 1000, // valid for 10 mins
    });

    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: "Your OTP - PizzaScript",
        html: `<h2>Your OTP is: ${otpCode}</h2><p>Expires in 10 minutes.</p>`,
    });

    res.status(200).json(new ApiResponse(200, null, "OTP sent to your email"));
});
