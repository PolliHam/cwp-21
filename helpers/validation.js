const Joi = require('joi');

const schemas = {
    'offices': Joi.object().keys({
        title: Joi.string(),
        website: Joi.string(),
        address: Joi.string()
    }),
    'agents': Joi.object().keys({
        name: Joi.string(),
        email: Joi.string().email(),
        tel: Joi.string(),
        officeId: Joi.number().positive().optional()
    }),
    'properties': Joi.object().keys({
        heading: Joi.string(),
        price: Joi.number().positive(),
        currency: Joi.string().regex(/(?:BYN|USD|EUR)/),
        location: Joi.string(),
        agentId: Joi.number().positive().optional()
    })
};

module.exports.validate = function (schema, body) {
    if(!schemas[schema])
        return {};
    return Joi.validate(body, schemas[schema], { presence: 'required' });
};