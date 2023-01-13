import {testController} from "@controller/test.controller";
import {Router} from "express";

const routes = Router();

routes.post('/', testController.index)

export {routes as testRouter};