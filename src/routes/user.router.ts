import {Router} from "express";
import {userController} from "@controller/user.controller";

const router = Router();

router.post('/user/verify', userController.verifyEmail);

export {router as userRouter};