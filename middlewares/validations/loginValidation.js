const Joi = require("joi");

const userLoginSchema = Joi.object({
	email: Joi.string().required(),
	password: Joi.string().required(),
});

const userLoginValidation = async (req, res, next) => {
	try {
		const { error } = userLoginSchema.validate(req.body);

		if (error) {
			res.status(400).json({
				message: error.message,
			});

			return;
		}

		next();
	} catch (error) {
		next(error);
	}
};

module.exports = { userLoginValidation };
