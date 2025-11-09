class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async findAll(filters = {}, options = {}) {
    const { page = 1, limit = 10, sort = '-createdAt', select } = options;
    const skip = (page - 1) * limit;

    const query = this.model.find(filters)
      .limit(limit)
      .skip(skip)
      .sort(sort);

    if (select) query.select(select);

    const data = await query.exec();
    const total = await this.model.countDocuments(filters);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async findById(id) {
    return await this.model.findById(id);
  }

  async findOne(filters) {
    return await this.model.findOne(filters);
  }

  async create(data) {
    return await this.model.create(data);
  }

  async updateById(id, data) {
    return await this.model.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    );
  }

  async deleteById(id) {
    return await this.model.findByIdAndDelete(id);
  }

  async exists(filters) {
    return await this.model.exists(filters);
  }
}

export default BaseRepository;