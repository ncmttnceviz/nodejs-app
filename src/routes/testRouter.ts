import {testController} from "@controller/test.controller";
import {Router} from "express";

const routes = Router();

routes.post('/', testController.index)
routes.get('/', testController.index)
routes.get('/c', testController.consumer)

export {routes as testRouter};