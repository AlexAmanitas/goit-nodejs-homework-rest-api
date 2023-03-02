const Joi = require('joi');

const userSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const userStatusSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business'),
});

module.exports = { userSchema, userStatusSchema };
