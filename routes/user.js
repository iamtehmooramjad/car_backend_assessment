import { Router } from "express";
import Joi from "joi";
import validate from "../middlewares/validate.js";
import {login} from "../controllers/user.js";

const router = Router();
const loginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string()
        .pattern(/^[a-zA-Z0-9#?!@$%^&*-]{8,}$/)
        .required(),
});


router.post("/login", validate(loginSchema), login);


export default router;
