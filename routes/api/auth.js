const express = require("express");
const {
	signup,
	login,
	logout,
	current,
} = require("../../controllers/usersControllers");
const { userSignUpValidation } = require("../../middlewares/userValidation");
const {
	userLoginValidation,
} = require("../../middlewares/validations/loginValidation");
const authentificate = require("../../middlewares/authentificate");

const authRouter = express.Router();

authRouter.post("/signup", userSignUpValidation, signup);

authRouter.post("/login", userLoginValidation, login);

authRouter.post("/logout", authentificate, logout);

authRouter.get("/current", authentificate, current);

module.exports = authRouter;
