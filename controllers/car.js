import Car from "../models/car.js";
import {error, success} from "../utils/response.js";
import Joi from "joi";
import {StatusCodes} from "http-status-codes";

const createCarSchema = Joi.object().keys({
  phone: Joi.string().length(11).pattern(/^[0-9]+$/).required(),
  model:Joi.string().min(3).required(),
  numberOfPics:Joi.number().min(1).max(10).required()
});

const createCar = async (req, res) => {
  try {
    const requestData = createCarSchema.validate(req.body);
    if (requestData?.error) {
      return error(res, StatusCodes.BAD_REQUEST, requestData.error.details[0]?.message.replace(/"/g, ""))
    }

    if (req.files?.length > 0) {
      const images = []
      req.files?.forEach((image)=>{
        const path = image.path?.replace(/\\/g, "/");
        const url = `${req.protocol}://${req.get("host")}/${path}`
        images.push(url);
      })

      const { model, price, phone, numberOfPics } = req.body;
      const owner = req.user.id;
      const car = new Car({ model, price, phone, images, owner, numberOfPics });
      await car.save();

      success(res, StatusCodes.CREATED, "Car Details Posted Successfully!", car)

    } else {
      error(res, StatusCodes.BAD_REQUEST, "Min 1 and Max 10 Images required!");
    }
  } catch (e) {
    error(res, StatusCodes.INTERNAL_SERVER_ERROR, e.message);

  }

}
export {
  createCar
}
