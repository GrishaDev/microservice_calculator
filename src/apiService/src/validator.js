const { number } = require('joi');
const Joi = require('joi');
const { HttpError } = require ('./helpers/httpError');

const calculationSchema = Joi.object({
    number1: Joi.number().required(),
    number2: Joi.number().required(),
});

const isValidCalculation = (req, res, next) => {
    const { error } = calculationSchema.validate(req.body);
    if(error) {
        sendError(error);
    }
    next(); 
}

const isValidDivision = (req, res, next) => {
    const { number2 } = req.body;

    if(number2 === 0) throw new HttpError(400, 'number2 must not be 0 in division');

    next();
}

const sendError = (err) => {
    let msg = err.details[0].message;
    msg = msg.replace(/"/g, '');
    throw new HttpError(400, msg);
}

module.exports = { isValidCalculation, isValidDivision}