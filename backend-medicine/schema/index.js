const Joi = require('joi');

const schemaMedicine = Joi.object({
    name: Joi.string()
        .min(2)
        .max(50)
        .required(),
    description: Joi.string()
        .min(5)
        .required(),
    price: Joi.number()
        .required(),
    count: Joi.number()
        .integer()
        .required(),
    companyId: Joi.number()
        .integer()
        .positive()
        .required(),
    date: Joi.date()
        .required()
});

const schemaMedicineUpdate = Joi.object({
    name: Joi.string()
        .min(2)
        .max(50),
    description: Joi.string()
        .min(5),
    price: Joi.number()
        .positive(),
    count: Joi.number()
        .integer()
        .positive(),
    companyId: Joi.number()
        .integer()
        .positive(),
    date: Joi.date()
});


const schemaCompany = Joi.object({
    name: Joi.string()
        .min(2)
        .max(50)
        .required(),
    description: Joi.string()
        .min(5)
        .required()
});

const schemaCompanyUpdate = Joi.object({
    name: Joi.string()
        .min(2)
        .max(50),
    description: Joi.string()
        .min(5)
});



module.exports = { schemaMedicine, schemaMedicineUpdate ,schemaCompany,schemaCompanyUpdate};
