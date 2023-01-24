import {Router} from "express";
import {authController} from "@controller/auth.controller";
import {authorizationMiddleware} from "@middleware/authorization-middleware";
import {errorHandler} from "@middleware/error-handler.middleware";

const router = Router();

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/me', authorizationMiddleware, authController.me);


export {router as authRouter};