import api from "@/lib/api";
import { ApiResponse, Testimonial } from '@/types';

export const testimonialService = {
  async getTestimonials(params?: {
    page?: number;
    limit?: number;
    search?: string;
    rating?: number;
    isApproved?: boolean;
    isFeatured?: boolean;
  }) {
    const { data } = await api.get<ApiResponse<Testimonial[]>>('/admin/testimonials', { params });
    return data;
  },

  async getTestimonial(id: string) {
    const { data } = await api.get<ApiResponse<Testimonial>>(`/admin/testimonials/${id}`);
    return data.data;
  },

  async createTestimonial(testimonialData: Partial<Testimonial>) {
    const { data } = await api.post<ApiResponse<Testimonial>>('/admin/testimonials', testimonialData);
    return data.data;
  },

  async updateTestimonial(id: string, testimonialData: Partial<Testimonial>) {
    const { data } = await api.put<ApiResponse<Testimonial>>(
      `/admin/testimonials/${id}`,
      testimonialData
    );
    return data.data;
  },

  async deleteTestimonial(id: string) {
    const { data } = await api.delete(`/admin/testimonials/${id}`);
    return data;
  },

  async toggleApproval(id: string) {
    const { data } = await api.patch<ApiResponse<Testimonial>>(
      `/admin/testimonials/${id}/toggle-approval`
    );
    return data.data;
  },

  async toggleFeatured(id: string) {
    const { data } = await api.patch<ApiResponse<Testimonial>>(
      `/admin/testimonials/${id}/toggle-featured`
    );
    return data.data;
  },

  async getStatistics() {
    const { data } = await api.get('/admin/testimonials/statistics');
    return data.data;
  },
};