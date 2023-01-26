import {Router} from "express";
import {authController} from "@controller/auth.controller";
import {RateLimiter} from "@middleware/rate-limiter.middleware";
import {authorizationMiddleware} from "@middleware/authorization.middleware";

const router = Router();

router.post('/auth/register', authController.register);
router.post('/auth/login', RateLimiter, authController.login);
router.post('/auth/logout', authorizationMiddleware, authController.logout)

export {router as authRouter};