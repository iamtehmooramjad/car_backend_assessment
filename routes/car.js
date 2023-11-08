import { Router } from "express";
import { createCar } from "../controllers/car.js";
import filesHandler from "../middlewares/filesHandler.js";
import {verifyToken} from "../middlewares/authenticate.js";

const router = Router();

router.post("/", verifyToken, filesHandler.any('images'), createCar);

export default router;
