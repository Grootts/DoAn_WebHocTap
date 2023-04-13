import express from "express";
import teacherController from "../controllers/teacherController.js";

const router = express.Router();

router.put("/update-teacher/:id", teacherController.updateTeacher);
router.delete("/delete-teacher/:id", teacherController.deleteTeacher);

export default router;
