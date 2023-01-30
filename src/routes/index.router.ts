import {Router} from "express";
import {authRouter} from "./auth.router";
import {userRouter} from "./user.router";

const router = Router();

router.use(authRouter);
router.use(userRouter);

export {router as routesIndex}