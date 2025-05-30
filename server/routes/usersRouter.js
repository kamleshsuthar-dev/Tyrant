import express from "express";
import userModel from "../models/user.models.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { getUserDetails, postUserDetails, deleteAddress, updateAddress, getUserAddress, addUserAddress } from "../controllers/userController.js";

const usersRouter = express.Router();
usersRouter.post("/add-address", isLoggedIn, addUserAddress)
usersRouter.get("/get-address", isLoggedIn, getUserAddress)
usersRouter.post("/edit-address/:addressId", isLoggedIn, updateAddress)
usersRouter.delete("/delete-address/:addressId", isLoggedIn, deleteAddress)

usersRouter.get("/get-user-details", isLoggedIn, getUserDetails)
usersRouter.post("/edit-user-details", isLoggedIn, postUserDetails)


export {usersRouter}
