import BaseRepository from './BaseRepository.js';
import RefreshToken from '../models/RefreshToken.js';

class RefreshTokenRepository extends BaseRepository {
  constructor() {
    super(RefreshToken);
  }

  async createToken(tokenData) {
    return await this.create(tokenData);
  }

  async findByToken(token) {
    return await this.findOne({ token, isRevoked: false });
  }

  async revokeToken(token) {
    return await this.model.findOneAndUpdate(
      { token },
      { isRevoked: true },
      { new: true }
    );
  }

  async revokeAllUserTokens(userId) {
    return await this.model.updateMany(
      { user: userId, isRevoked: false },
      { isRevoked: true }
    );
  }

  async deleteExpiredTokens() {
    return await this.model.deleteMany({
      expiresAt: { $lt: new Date() }
    });
  }

  async getUserActiveTokens(userId) {
    return await this.findAll({
      user: userId,
      isRevoked: false,
      expiresAt: { $gt: new Date() }
    });
  }
}

export default new RefreshTokenRepository();