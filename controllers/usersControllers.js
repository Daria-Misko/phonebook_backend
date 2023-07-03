const User = require("../db/models/userModel");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const signup = async (req, res, next) => {
	try {
		const { email, password, name } = req.body;
		const user = await User.findOne({ email });

		if (user) {
			res.status(409).json({
				message: "User is already exist",
			});
		}

		const avatar = gravatar.url({ email });

		const newUser = new User({
			name,
			email,
			password,
			avatar,
		});

		await newUser.hashPassword(password);

		await newUser.save();

		const payload = { id: newUser._id };
		const token = jwt.sign(payload, SECRET_KEY);

		await User.findByIdAndUpdate(newUser._id, { token });

		res.status(201).json({
			user: {
				name: name,
				email: email,
				avatar: avatar,
			},
			token: token,
		});
	} catch (error) {
		next(error);
	}
};

module.exports = { signup };
