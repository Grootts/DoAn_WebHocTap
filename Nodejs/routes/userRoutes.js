import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.put("/update-user/:id", userController.updateUser);
router.delete("/delete-user/:id", userController.deleteUser);
router.get("/get-all", userController.getAllUser);
router.get("/get-details/:id", userController.getDetailsUser);
export default router;
