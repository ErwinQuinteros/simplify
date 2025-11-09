import { Router } from "express";
import userController from "../../controllers/admin/UserController.js";
import { validate } from "../../middlewares/validation.middleware.js";
import {
  createUserValidator,
  updateUserValidator,
  updatePasswordValidator,
  getUserValidator,
  getUsersQueryValidator,
} from "../../validators/user.validator.js";

const router = Router();


router.get("/", getUsersQueryValidator, validate, userController.getAll);
router.get("/:id", getUserValidator, validate, userController.getById);
router.post("/", createUserValidator, validate, userController.create);
router.put("/:id", updateUserValidator, validate, userController.update);
router.delete("/:id", getUserValidator, validate, userController.delete);


router.patch(
  "/:id/toggle-status",
  getUserValidator,
  validate,
  userController.toggleStatus
);

router.patch(
  "/:id/password",
  updatePasswordValidator,
  validate,
  userController.updatePassword
);

export default router;
