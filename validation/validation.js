const Joi = require('joi');
const _ = require('lodash');

const userSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().min(3).required(),
    password: Joi.string().min(6).required()
});
const loginSchema = Joi.object({
    email: Joi.string().email().min(3).required(),
    password: Joi.string().min(6).required()
});

function validateUser(user) {
    return userSchema.validate(user);
}

function validateLogin(req) {
    return loginSchema.validate(req);
}

module.exports = {
    validateUser,
    validateLogin
}