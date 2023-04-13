import express from "express";
import orderController from "../controllers/orderController.js";

const router = express.Router();
router.post("/create/:id", orderController.createOrder);
router.get("/get-all-order/:id", orderController.getAllOrderDetails);
router.get("/get-details-order/:id", orderController.getDetailsOrder);
router.delete("/cancel-order/:id", orderController.cancelOrderDetails);
router.get("/get-all-order", orderController.getAllOrder);
export default router;
