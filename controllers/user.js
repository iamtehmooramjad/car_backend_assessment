import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {success, error} from "../utils/response.js";
import {StatusCodes} from "http-status-codes";


const login = async (req, res) => {
  try {
    const {email,password} = req.body
    const userFound = await User.findOne({ email });
    if (userFound) {
      const passwordMatched = await bcrypt.compare(
          password,
          userFound?.password
      );

      if (passwordMatched) {
        let userData = {
          id: userFound?._id,
          email: userFound?.email,
        };
        const token = jwt.sign(userData, process.env.JWT_SECRETKEY,{
          expiresIn: '24h'
        });
        success(res, StatusCodes.OK, "Login successfully", {
          ...userData, token
        });
      } else {
        error(res, StatusCodes.BAD_REQUEST, "Wrong password");
      }
    } else {
      error(res, StatusCodes.BAD_REQUEST, "Invalid Credentials!");
    }
  } catch (e) {
    error(res, StatusCodes.INTERNAL_SERVER_ERROR, e?.message);
  }
};



export {login};
