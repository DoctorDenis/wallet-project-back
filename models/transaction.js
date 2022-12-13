const { Schema, model } = require("mongoose");
const Joi = require("joi");
const saveErrorHandler = require("../helpers/saveErrorHandler");

const addTransactionSchema = new Schema({
  isIncome: {
    type: Boolean,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
  },
  category: {
    type: String,
    required: true,
    default: "Main expenses",
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

addTransactionSchema.post("save", saveErrorHandler);

const Transaction = model("transaction", addTransactionSchema);

const joiSchema = Joi.object({
  isIncome: Joi.boolean().required().messages({
    "boolean.base": "'isIncome' should be a type of 'boolean'",
    "any.required": "'isIncome' is a required field",
  }),
  amount: Joi.number().required().messages({
    "number.base": "'amount' should be a type of 'number'",
    "any.required": "'amount' is a required field",
  }),
  comment: Joi.string().empty("").messages({
    "string.base": "'comment' should be a type of 'string'",
  }),
  category: Joi.string().messages({
    "string.base": "'category' should be a type of 'string'",
  }),
  date: Joi.date().messages({
    "any.required": "'date' is a required field",
  }),
  balance: Joi.number().messages({
    "number.base": "'balance' should be a type of 'number'",
  }),
});

const schemas = {
  joiSchema,
};

module.exports = {
  Transaction,
  schemas,
};
