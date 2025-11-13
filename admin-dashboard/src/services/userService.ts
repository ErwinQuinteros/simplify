import api from '@/lib/api';
import { ApiResponse, User } from '@/types';

export const userService = {
  async getUsers(params?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    isActive?: boolean;
  }) {
    const { data } = await api.get<ApiResponse<User[]>>('/admin/users', { params });
    console.log(data)
    return data;
  },

  async getUser(id: string) {
    const { data } = await api.get<ApiResponse<User>>(`/admin/users/${id}`);
    return data.data;
  },

  async createUser(userData: Partial<User>) {
    const { data } = await api.post<ApiResponse<User>>('/admin/users', userData);
    return data.data;
  },

  async updateUser(id: string, userData: Partial<User>) {
    const { data } = await api.put<ApiResponse<User>>(`/admin/users/${id}`, userData);
    return data.data;
  },

  async deleteUser(id: string) {
    const { data } = await api.delete(`/admin/users/${id}`);
    return data;
  },

  async toggleUserStatus(id: string) {
    const { data } = await api.patch<ApiResponse<User>>(`/admin/users/${id}/toggle-status`);
    return data.data;
  },
};