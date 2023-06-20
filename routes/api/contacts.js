const express = require("express");
const {
	getAllCtrl,
	addContactCtrl,
} = require("../../controllers/contactsControllers");
const {
	contactValidatior,
} = require("../../middlewares/validations/contactValidation");

const router = express.Router();

router.get("/", getAllCtrl);

router.post("/", contactValidatior, addContactCtrl);

router.delete("/:contactId");

router.put("/:contactId");

module.exports = router;
