const Joi = require("joi");
const FIELS = ["name", "number"];

const addSchema = Joi.object({
	name: Joi.string().min(3).max(30).required(),
	number: Joi.string().required(),
});

const contactValidatior = (req, res, next) => {
	if (!Object.keys(req.body).length) {
		res.status(400).json({
			message: "fields can not be empty",
		});
		return;
	}

	for (const item of FIELS) {
		if (req.body[item] === undefined) {
			res.status(400).json({
				message: `${item} is missing`,
			});
			return;
		}
	}

	const { error } = addSchema.validate(req.body);
	if (error) {
		res.status(400).json({
			message: error.message,
		});
		return;
	}

	next();
};

module.exports = { contactValidatior };
