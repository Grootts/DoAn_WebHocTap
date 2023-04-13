import express from "express";
import lessonController from "../controllers/lessonController.js";
const router = express.Router();
router.post("/create", lessonController.createLesson);
router.put("/add-lesson/:id", lessonController.addLesson);
router.get("/get-all", lessonController.getAllLesson);
router.get("/get-details/:id", lessonController.getDetailsLesson);
export default router;
