import express from "express";
import {
  signup,
  login,
  logout,
  validateToken,
} from "../controllers/user.controller.js";
import { checkAndRenewToken } from "../middleware/validateToken.js";
import { getAIinsights } from "../utils/index.mjs";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.get("/ai", checkAndRenewToken, getAIinsights);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.get("/validateUser", checkAndRenewToken, validateToken);

export default userRouter;
