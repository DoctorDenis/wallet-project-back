const express = require("express");
const getStatistics = require("../controllers/statistics/statistics");

const validateToken = require("../helpers/validateToken");

const router = express.Router();

router.get("/", validateToken, getStatistics);

module.exports = router;
