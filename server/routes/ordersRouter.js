import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { getUserOrders, postCreateOrder, postCancelOrder, getAllOrders } from "../controllers/ordersController.js";

const ordersRouter = express.Router();

ordersRouter.get("/all-orders", isLoggedIn, getAllOrders);
ordersRouter.get("/user-orders", isLoggedIn, getUserOrders);
ordersRouter.post("/create-order", isLoggedIn, postCreateOrder);
ordersRouter.delete("/cancel-order/:id", isLoggedIn, postCancelOrder);

export { ordersRouter };