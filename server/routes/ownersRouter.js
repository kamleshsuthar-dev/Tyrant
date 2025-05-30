import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const ownersRouter = express.Router();
ownersRouter.get("/", (req, res) => res.send("Welcome to the Owners route"));
ownersRouter.get("/admin",(req,res)=>{
    res.send("Jinccinsics")
});


export { ownersRouter };