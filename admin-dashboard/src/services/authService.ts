import api from "@/lib/api";
import { ApiResponse, LoginCredentials, RegisterData, User } from "@/types";

export const authService = {
  async adminLogin(credentials: LoginCredentials) {
    const { data } = await api.post<
      ApiResponse<{ user: User; accessToken: string }>
    >("/auth/admin/login", credentials);
    return data.data;
  },
  async login(credentials: LoginCredentials) {
    const { data } = await api.post<
      ApiResponse<{ user: User; accessToken: string }>
    >("/auth/login", credentials);
    return data.data;
  },
  async register(userData: RegisterData) {
    const { data } = await api.post<
      ApiResponse<{ user: User; accessToken: string }>
    >("/auth/register", userData);
    return data.data;
  },

  async logout() {
    const { data } = await api.post("/auth/logout");
    return data;
  },

  async getProfile() {
    const { data } = await api.get<ApiResponse<User>>("/auth/me");
    return data.data;
  },

  async updateProfile(userData: Partial<User>) {
    const { data } = await api.put<ApiResponse<User>>("/auth/me", userData);
    return data.data;
  },

  async changePassword(passwords: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) {
    const { data } = await api.post("/auth/change-password", passwords);
    return data;
  },
};
