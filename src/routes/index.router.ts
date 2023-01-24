import {Router} from "express";
import {testRouter} from "./testRouter";
import {authRouter} from "./auth.router";

const router = Router();

router.use(testRouter);
router.use(authRouter);

export {router as routesIndex}