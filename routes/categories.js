const express = require("express");
const getCategories = require("../controllers/categories/getCategories");

// const ctrl = require("../controllers/transactions");

const validateToken = require("../helpers/validateToken");

const router = express.Router();

router.get("/", validateToken, getCategories);

module.exports = router;
