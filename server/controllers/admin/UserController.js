import userService from '../../services/admin/UserService.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

class UserController {
  getAll = asyncHandler(async (req, res) => {
    const result = await userService.getAllUsers(req.query);
    
    ApiResponse.success(res, result.data, 'Users retrieved successfully', {
      pagination: result.pagination
    });
  });

  getById = asyncHandler(async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    
    ApiResponse.success(res, user, 'User retrieved successfully');
  });

  create = asyncHandler(async (req, res) => {
    const user = await userService.createUser(req.body);
    
    ApiResponse.created(res, user, 'User created successfully');
  });

  update = asyncHandler(async (req, res) => {
    const user = await userService.updateUser(req.params.id, req.body);
    
    ApiResponse.success(res, user, 'User updated successfully');
  });

  delete = asyncHandler(async (req, res) => {
    const result = await userService.deleteUser(req.params.id);
    
    ApiResponse.success(res, null, result.message);
  });

  toggleStatus = asyncHandler(async (req, res) => {
    const user = await userService.toggleUserStatus(req.params.id);
    
    ApiResponse.success(res, user, 'User status updated successfully');
  });

  updatePassword = asyncHandler(async (req, res) => {
    const result = await userService.updateUserPassword(
      req.params.id,
      req.body.password
    );
    
    ApiResponse.success(res, null, result.message);
  });
}

export default new UserController();