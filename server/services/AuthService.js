import userRepository from "../repositories/UserRepository.js";
import refreshTokenRepository from "../repositories/RefreshTokenRepository.js";
import { ApiError } from "../utils/ApiError.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";
import { COOKIE_EXPIRES_IN } from "../config/environment.js";

class AuthService {
  async register(userData) {
    const existingUser = await userRepository.findByEmail(userData.email);

    if (existingUser) {
      throw new ApiError(400, "Email already exists");
    }

    const user = await userRepository.create({
      ...userData,
      role: "user",
    });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    await this.saveRefreshToken(user._id, refreshToken);

    user.password = undefined;

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async login(email, password, ipAddress, userAgent) {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    if (!user.isActive) {
      throw new ApiError(403, "Your account has been deactivated");
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid email or password");
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    await this.saveRefreshToken(user._id, refreshToken, ipAddress, userAgent);

    user.password = undefined;

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async refreshAccessToken(refreshToken) {
    let decoded;
    try {
      decoded = verifyRefreshToken(refreshToken);
    } catch (error) {
      throw new ApiError(401, "Invalid or expired refresh token");
    }

    const storedToken = await refreshTokenRepository.findByToken(refreshToken);

    if (!storedToken) {
      throw new ApiError(401, "Refresh token not found or has been revoked");
    }

    const user = await userRepository.findById(decoded.userId);

    if (!user || !user.isActive) {
      throw new ApiError(401, "User not found or inactive");
    }

    const newAccessToken = generateAccessToken(user._id);

    return {
      accessToken: newAccessToken,
    };
  }

  async logout(refreshToken) {
    if (!refreshToken) {
      throw new ApiError(400, "Refresh token is required");
    }

    const revokedToken = await refreshTokenRepository.revokeToken(refreshToken);

    if (!revokedToken) {
      throw new ApiError(404, "Refresh token not found");
    }

    return { message: "Logged out successfully" };
  }

  async logoutAllDevices(userId) {
    await refreshTokenRepository.revokeAllUserTokens(userId);

    return { message: "Logged out from all devices successfully" };
  }

  async changePassword(userId, currentPassword, newPassword) {
    const user = await userRepository.findById(userId).select("+password");

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await user.comparePassword(currentPassword);

    if (!isPasswordValid) {
      throw new ApiError(401, "Current password is incorrect");
    }

    user.password = newPassword;
    await user.save();

    await refreshTokenRepository.revokeAllUserTokens(userId);

    return { message: "Password changed successfully. Please login again." };
  }

  async getProfile(userId) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return user;
  }

  async updateProfile(userId, updateData) {
    delete updateData.password;
    delete updateData.role;

    const user = await userRepository.updateById(userId, updateData);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return user;
  }

  async saveRefreshToken(userId, token, ipAddress = null, userAgent = null) {
    const expiresAt = new Date();
    expiresAt.setTime(expiresAt.getTime() + COOKIE_EXPIRES_IN);

    return await refreshTokenRepository.createToken({
      token,
      user: userId,
      expiresAt,
      ipAddress,
      userAgent,
    });
  }

  async getActiveSessions(userId) {
    const result = await refreshTokenRepository.getUserActiveTokens(userId);
    return result.data || [];
  }
}

export default new AuthService();
