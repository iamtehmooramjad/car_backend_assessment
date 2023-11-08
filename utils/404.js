import {ReasonPhrases, StatusCodes} from "http-status-codes";

export const handle404 = (req, res, next) => {
  return res.status(StatusCodes.NOT_FOUND).json({ message: ReasonPhrases.NOT_FOUND});
};
