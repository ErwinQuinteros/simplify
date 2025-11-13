import authService from "../services/AuthService.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { NODE_ENV } from "../config/environment.js";

class AuthController {
  register = asyncHandler(async (req, res) => {
    const result = await authService.register(req.body);

    this.setRefreshTokenCookie(res, result.refreshToken);

    ApiResponse.created(
      res,
      {
        user: result.user,
        accessToken: result.accessToken,
      },
      "User registered successfully"
    );
  });

  login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const ipAddress = req.ip;
    const userAgent = req.headers["user-agent"];

    const result = await authService.login(
      email,
      password,
      ipAddress,
      userAgent
    );

    this.setRefreshTokenCookie(res, result.refreshToken);

    ApiResponse.success(
      res,
      {
        user: result.user,
        accessToken: result.accessToken,
      },
      "Login successful"
    );
  });
  adminLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const ipAddress = req.ip;
    const userAgent = req.headers["user-agent"];

    const result = await authService.adminLogin(
      email,
      password,
      ipAddress,
      userAgent
    );

    this.setRefreshTokenCookie(res, result.refreshToken);

    ApiResponse.success(
      res,
      {
        user: result.user,
        accessToken: result.accessToken,
      },
      "Admin login successful"
    );
  });

  refreshToken = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

    const result = await authService.refreshAccessToken(refreshToken);

    ApiResponse.success(res, result, "Token refreshed successfully");
  });

  logout = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

    await authService.logout(refreshToken);

    this.clearRefreshTokenCookie(res);

    ApiResponse.success(res, null, "Logged out successfully");
  });

  logoutAll = asyncHandler(async (req, res) => {
    await authService.logoutAllDevices(req.user.userId);

    this.clearRefreshTokenCookie(res);

    ApiResponse.success(res, null, "Logged out from all devices successfully");
  });

  getProfile = asyncHandler(async (req, res) => {
    const user = await authService.getProfile(req.user.userId);

    ApiResponse.success(res, user, "Profile retrieved successfully");
  });

  updateProfile = asyncHandler(async (req, res) => {
    const user = await authService.updateProfile(req.user.userId, req.body);

    ApiResponse.success(res, user, "Profile updated successfully");
  });

  changePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    const result = await authService.changePassword(
      req.user.userId,
      currentPassword,
      newPassword
    );

    this.clearRefreshTokenCookie(res);

    ApiResponse.success(res, null, result.message);
  });

  getSessions = asyncHandler(async (req, res) => {
    const sessions = await authService.getActiveSessions(req.user.userId);

    ApiResponse.success(
      res,
      sessions,
      "Active sessions retrieved successfully"
    );
  });

  setRefreshTokenCookie(res, token) {
    res.cookie("refreshToken", token, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

  clearRefreshTokenCookie(res) {
    res.clearCookie("refreshToken");
  }
}

export default new AuthController();
