import {Router} from "express";
import {authController} from "@controller/auth.controller";
import {authorizationMiddleware} from "@middleware/authorization.middleware";
import {RateLimiter} from "@middleware/rate-limit.middleware";

const router = Router();

router.post('/auth/register', authController.register);
router.post('/auth/login', RateLimiter, authController.login);
router.post('/auth/me', authorizationMiddleware, authController.me);


export {router as authRouter};