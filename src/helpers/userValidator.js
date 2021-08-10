const Joi = require("joi");

const validators = {};

validators.validateUserSignUp = (userData) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).email().required(),
    password: Joi.string().min(3).max(225).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  });

  return schema.validate(userData);
};

validators.validateUserLogin = (userData) => {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).email().required(),
    password: Joi.string().min(3).max(225).required(),
  });

  return schema.validate(userData);
};

validators.validateUserEdit = (userData) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).email().required(),
  });

  return schema.validate(userData);
};

module.exports = validators;
