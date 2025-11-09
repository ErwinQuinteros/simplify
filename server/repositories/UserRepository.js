import BaseRepository from './BaseRepository.js';
import User from '../models/User.js';

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async findByEmail(email) {
    return await this.model.findOne({ email }).select('+password');
  }

  async findActiveUsers(options) {
    return await this.findAll({ isActive: true }, options);
  }

  async updatePassword(userId, newPassword) {
    const user = await this.model.findById(userId);
    if (!user) return null;
    
    user.password = newPassword;
    await user.save();
    return user;
  }

  async toggleStatus(userId) {
    const user = await this.model.findById(userId);
    if (!user) return null;
    
    user.isActive = !user.isActive;
    await user.save();
    return user;
  }
}

export default new UserRepository();