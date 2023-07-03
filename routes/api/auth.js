const express = require("express");
const { signup } = require("../../controllers/usersControllers");
const { userSignUpValidation } = require("../../middlewares/userValidation");

const authRouter = express.Router();

authRouter.post("/signup", userSignUpValidation, signup);

authRouter.post("/login");

authRouter.post("/logout");

authRouter.get("/current");

module.exports = authRouter;
