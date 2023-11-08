const success = (res, status, message, data) => {
  return res.status(status).json({
    status,
    message,
    data,
  });
};

const error = (res, status, error) => {
  return res.status(status).json({
    status,
    message: "Something went wrong",
    error,
  });
};

export {success, error};
