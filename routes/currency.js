const express = require("express");

const getCurrency = require("../controllers/currency/getCurrency");

const ctrlWrapper = require("../helpers/ctrlWrapper");

const router = express.Router();

router.get("/", ctrlWrapper(getCurrency));

module.exports = router;
