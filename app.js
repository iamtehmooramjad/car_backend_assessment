import express from "express";
import { config } from "dotenv";
import userRoute from "./routes/user.js";
import carRoute from "./routes/car.js";
import { handle404 } from "./utils/404.js";
import cors from "cors";
config();
import {mongooseConnect} from "./database/database.js";
import User from "./models/user.js";
import bcrypt from "bcrypt";

const app = express();



/** Middlewares */
app.use(cors());
app.use(express.json());
app.use("/images", express.static("./images"));

//Routes
app.use("/users", userRoute);
app.use("/cars", carRoute);
app.use("*", handle404);


mongooseConnect
    .then(async () => {
        const user = {
            email:"Amjad@desolint.com",
            password: "123456abc"
        }

        const userExists = await User.findOne({ email:"Amjad@desolint.com" });
        if (!userExists){
           user.password = bcrypt.hashSync(user.password, 10);
            const newUser = new User({...user})
            await newUser.save();
        }
        app.listen(process.env.PORT, () => {
            console.log(`Server started on port ${process.env.PORT}`);
        });
    }).catch(err => {
    console.log(err)
});


