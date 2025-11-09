import testimoanilService from '../../services/admin/TestimonialService.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

class TestimonialController {
  getAll = asyncHandler(async (req, res) => {
    const result = await testimoanilService.getAllUsers(req.query);
    
    ApiResponse.success(res, result.data, 'Testimonials retrieved successfully', {
      pagination: result.pagination
    });
  });

  getById = asyncHandler(async (req, res) => {
    const testimonial = await testimoanilService.getTestimoanialById(req.params.id);
    
    ApiResponse.success(res, testimonial, 'User retrieved successfully');
  });

  create = asyncHandler(async (req, res) => {
    const testimonial = await testimoanilService.createTestimonial(req.body);
    
    ApiResponse.created(res, testimonial, 'Testimonials created successfully');
  });

  update = asyncHandler(async (req, res) => {
    const testimonial = await testimoanilService.updateTestimonial(req.params.id, req.body);
    
    ApiResponse.success(res, user, 'User updated successfully');
  });

  delete = asyncHandler(async (req, res) => {
    const result = await testimoanilService.deleteTestimonial(req.params.id);
    
    ApiResponse.success(res, null, result.message);
  });

  toggleStatus = asyncHandler(async (req, res) => {
    const testimonial = await testimoanilService.toggleTestimonialStatus(req.params.id);
    
    ApiResponse.success(res, testimonial, 'Testimonial status updated successfully');
  });

//   // PATCH /api/admin/users/:id/password
//   updatePassword = asyncHandler(async (req, res) => {
//     const result = await testimoanilService.updateUserPassword(
//       req.params.id,
//       req.body.password
//     );
    
//     ApiResponse.success(res, null, result.message);
//   });
}

export default new TestimonialController();