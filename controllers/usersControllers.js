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

const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });

		if (!user) {
			res.status(401).json({
				message: "Email or password is not correct!",
			});
			return;
		}

		const checkPassword = await user.checkPassword(password);

		if (!checkPassword) {
			res.status(401).json({
				message: "Email or password is not correct!",
			});
			return;
		}

		const payload = { id: user._id };

		const token = jwt.sign(payload, SECRET_KEY);

		await User.findByIdAndUpdate(user._id, { token });

		res.json({
			user: {
				name: user.name,
				email: user.email,
				avatar: user.avatar,
			},
			token: token,
		});
	} catch (error) {
		next(error);
	}
};

const logout = async (req, res, next) => {
	try {
		const { _id } = req.user;

		await User.findByIdAndUpdate(_id, { token: "" });

		res.status(204).send();
	} catch (error) {
		next(error);
	}
};

const current = async (req, res, next) => {
	try {
		const { email, name, avatar } = req.user;

		res.json({
			name,
			email,
			avatar,
		});
	} catch (error) {
		next(error);
	}
};

module.exports = { signup, login, logout, current };
