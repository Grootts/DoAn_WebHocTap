import express from "express";
import courseController from "../controllers/courseController.js";

const router = express.Router();
router.post("/create", courseController.createCourse);
router.put("/update/:id", courseController.updateCourse);
router.get("/get-details/:id", courseController.getDetailsCourse);
router.delete("/delete/:id", courseController.deleteCourse);
router.get("/get-all", courseController.getAllCourse);
router.put("/update-follow/:id", courseController.updateUserFollow);
export default router;
