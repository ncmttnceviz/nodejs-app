import {Router} from "express";
import {authController} from "@controller/auth.controller";
import {RateLimiter} from "@middleware/rate-limiter.middleware";

const router = Router();

router.post('/auth/register', authController.register);
router.post('/auth/login', RateLimiter, authController.login);


export {router as authRouter};