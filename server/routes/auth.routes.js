import { Router } from "express";
import authController from "../controllers/AuthController.js";
import { auth } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";
import {
    registerValidator,
    loginValidator,
    changePasswordValidator,
    updateProfileValidator,
} from "../validators/auth.validator.js";

const router = Router();
router.post(
  '/admin/login',
  loginValidator,
  validate,
  authController.adminLogin
);
router.post("/register", registerValidator, validate, authController.register);

router.post("/login", loginValidator, validate, authController.login);

router.post("/refresh", authController.refreshToken);

router.post("/logout", auth, authController.logout);

router.post("/logout-all", auth, authController.logoutAll);

router.get("/me", auth, authController.getProfile);

router.put("/me", auth, updateProfileValidator, validate, authController.updateProfile);

router.post("/change-password", auth, changePasswordValidator, validate, authController.changePassword);

router.get("/sessions", auth, authController.getSessions);

export default router;
