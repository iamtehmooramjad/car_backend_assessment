const validate = (schema) => {
    return (req, res, next) => {
        const requestData = schema.validate(req?.body);
        if (requestData?.error) {
            return res.status(400).json({
                status: 400,
                message: requestData.error.details[0]?.message.replace(/"/g, ""),
            });
        }
        next();
    };
};

export default validate;
