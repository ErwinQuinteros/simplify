export class ApiResponse {
  static success(res, data, message = 'Success', meta = {}) {
    return res.status(200).json({
      success: true,
      message,
      data,
      ...meta
    });
  }

  static created(res, data, message = 'Created successfully') {
    return res.status(201).json({
      success: true,
      message,
      data
    });
  }
}