import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

// ✅ Admin: Get all users
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}, "username email role");
  res.status(200).json(new ApiResponse(200, users, "Users fetched successfully"));
});

// ✅ Admin: Delete a user
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);
  if (!user) throw new ApiError(404, "User not found");

  res.status(200).json(new ApiResponse(200, null, "User deleted successfully"));
});

// ✅ User: Get current logged-in user profile
export const getMyProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id, "username email role createdAt");
  if (!user) throw new ApiError(404, "User not found");

  res.status(200).json(new ApiResponse(200, user, "User profile fetched"));
});

// ✅ User: Update own profile (e.g., username or email)
export const updateMyProfile = asyncHandler(async (req, res) => {
  const { username, email } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError(404, "User not found");

  if (username) user.username = username;
  if (email) user.email = email;

  await user.save();

  res.status(200).json(new ApiResponse(200, user, "Profile updated successfully"));
});
