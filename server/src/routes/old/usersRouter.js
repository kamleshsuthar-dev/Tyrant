import express from "express";
import {
  addUserAddress,
  deleteAddress,
  getUserAddress,
  getUserDetails,
  postUserDetails,
  updateAddress,
} from "../../controllers/userController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const usersRouter = express.Router();
usersRouter.post("/add-address", isLoggedIn, addUserAddress);
usersRouter.get("/get-address", isLoggedIn, getUserAddress);
usersRouter.post("/edit-address/:addressId", isLoggedIn, updateAddress);
usersRouter.delete("/delete-address/:addressId", isLoggedIn, deleteAddress);

usersRouter.get("/get-user-details", isLoggedIn, getUserDetails);
usersRouter.post("/edit-user-details", isLoggedIn, postUserDetails);

export { usersRouter };
