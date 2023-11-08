import jwt from "jsonwebtoken";
import {error} from "../utils/response.js";
import {StatusCodes} from "http-status-codes";

const verifyToken = (req, res, next) => {
    try {
        const token = req?.headers?.authorization?.split(" ")[1];
        if (!token) {
            error(res, StatusCodes.UNAUTHORIZED, "Token is required!");
        } else {
            const user = jwt.verify(token, process.env.JWT_SECRETKEY);
            if (Object?.keys(user)?.length < 1) {
                error(res, StatusCodes.UNAUTHORIZED, "Invalid Token!");
            } else {
                req.user = user
                next();
            }
        }
    } catch (e) {
        error(res, StatusCodes.INTERNAL_SERVER_ERROR, e.message);
    }
};



export {
    verifyToken
}
