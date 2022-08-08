const Joi = require('joi')

const BaseValidation = require("../middleware/baseValidation")

class AccessValidation {
   create(req, res, next) {
      const create_schema = Joi.object({
         access_key: Joi.string().required(),
         user_id: Joi.number().min(1).required(),
         user_type: Joi.string().max(1).required(),
         access_status: Joi.string().min(1),
         access_expdt: Joi.date(),
         access_dt: Joi.date().required(),
         access_lastupdate: Joi.date()
      })
      return BaseValidation.AccessBody(req, res, next, create_schema)
   }

   update(req, res, next) {
      const update_schema = Joi.object({
         access_key: Joi.string().required(),
         user_id: Joi.string().min(1).required(),
         user_type: Joi.string().max(1).required(),
         access_status: Joi.string().min(1).required(),
         access_expdt: Joi.date().min(4).required(),
         access_dt: Joi.date().required(),
         access_lastupdate: Joi.date()
      })
      return BaseValidation.AccessBody(req, res, next, update_schema)
   }
}

module.exports = new AccessValidation()