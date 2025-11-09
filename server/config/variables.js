const config = {
  port: process.env.PORT || 5000,
  codes: {
    success: "SUCCESS",
    error: "ERROR",
    not_registered: "NOT_REGISTERED",
    unauthorized: "UNAUTHORIZED",
  }
};

export default config;