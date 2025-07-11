import { User } from "../models/user.model.js";
import { OTP } from "../models/otp.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

// ✅ Get all users (Admin only)
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}, "username email role");
  res
    .status(200)
    .json(new ApiResponse(200, users, "Users fetched successfully"));
});

// ✅ Delete user
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);
  if (!user) throw new ApiError(404, "User not found");

  res.status(200).json(new ApiResponse(200, null, "User deleted successfully"));
});

// ✅ Get my profile
export const getMyProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id, "username email role createdAt");
  if (!user) throw new ApiError(404, "User not found");

  res.status(200).json(new ApiResponse(200, user, "User profile fetched"));
});

// ✅ Update my profile after verifying OTP
export const verifyOtpAndUpdate = asyncHandler(async (req, res) => {
  const { username, email, otp } = req.body;

  if (!username || !email || !otp) {
    throw new ApiError(400, "Username, email, and OTP are required");
  }

  const validOtp = await OTP.findOne({
    email,
    otp,
    expiresAt: { $gt: Date.now() }, // ensure OTP not expired
  });

  if (!validOtp) {
    throw new ApiError(400, "Invalid or expired OTP");
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.username = username;
  user.email = email;
  await user.save();

  // Clean up used OTP
  await OTP.deleteOne({ _id: validOtp._id });

  res.status(200).json(
    new ApiResponse(
      200,
      {
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      "Profile updated successfully after OTP verification"
    )
  );
});
