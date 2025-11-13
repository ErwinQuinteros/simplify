import userRepository from '../../repositories/UserRepository.js';
import { ApiError } from '../../utils/ApiError.js';

class UserService {
  async getAllUsers(query) {
    const { page, limit, search, role, isActive, sort } = query;
    
    const filters = {};
    
    if (search) {
      filters.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (role) filters.role = role;
    if (isActive !== undefined) filters.isActive = isActive === 'true';

    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      sort: sort || '-createdAt'
    };

    return await userRepository.findAll(filters, options);
  }

  async getUserById(userId) {
    const user = await userRepository.findById(userId);
    
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    
    return user;
  }

  async createUser(userData) {
    const existingUser = await userRepository.findByEmail(userData.email);
    
    if (existingUser) {
      throw new ApiError(400, 'Email already exists');
    }

    const user = await userRepository.create(userData);
    return user;
  }

  async updateUser(userId, updateData) {
    delete updateData.password;
    
    if (updateData.email) {
      const existingUser = await userRepository.findOne({
        email: updateData.email,
        _id: { $ne: userId }
      });
      
      if (existingUser) {
        throw new ApiError(400, 'Email already exists');
      }
    }

    const user = await userRepository.updateById(userId, updateData);
    
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    
    return user;
  }

  async deleteUser(userId) {
    const user = await userRepository.deleteById(userId);
    
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    
    return { message: 'User deleted successfully' };
  }

  async toggleUserStatus(userId) {
    const user = await userRepository.toggleStatus(userId);
    
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    
    return user;
  }

  async updateUserPassword(userId, newPassword) {
    const user = await userRepository.updatePassword(userId, newPassword);
    
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    
    return { message: 'Password updated successfully' };
  }
}

export default new UserService();