import mongoose from "mongoose";
import {config} from "dotenv";
config();
const mongooseConnect = mongoose.connect(process.env.MONGO_URL)
 export {
    mongooseConnect
 }
