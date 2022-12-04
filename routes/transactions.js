const express = require("express");

const ctrl = require("../controllers/transactions");

const ctrlWrapper = require("../helpers/ctrlWrapper");
const { validateBody } = require("../middlewares");
const { schemas } = require("../models/transaction");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.post("/add", validateBody(schemas.joiSchema), ctrlWrapper(ctrl.add));

module.exports = router;
