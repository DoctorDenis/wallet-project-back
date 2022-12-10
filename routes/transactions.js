const express = require("express");

const ctrl = require("../controllers/transactions");

const ctrlWrapper = require("../helpers/ctrlWrapper");
const validateToken = require("../helpers/validateToken");
const { validateBody } = require("../middlewares");
const { schemas } = require("../models/transaction");
const { isValidId } = require("../middlewares/");

const router = express.Router();

router.get("/", validateToken, ctrlWrapper(ctrl.getAll));

router.post(
  "/add",
  validateBody(schemas.joiSchema),
  validateToken,
  ctrlWrapper(ctrl.add)
);

router.delete(
  "/:transactionId",
  validateToken,
  isValidId,
  ctrlWrapper(ctrl.remove)
);

module.exports = router;
