import Joi from 'joi'

/*const username = Joi
  .string()
  .alphanum()
  .min(4)
  .max(20)
  .required()*/

const password = Joi.string()
  .min(5)
  .max(20)
  .required()

const email = Joi.string()
  .required()
  .email({ tlds: { allow: false } })


const Registerschema = Joi.object({
  email,
  password,
  confirmPassword: Joi
    .any()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': '"confirmPassword" must be the same as password',
    })
})

const Loginschema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
})

export { Registerschema, Loginschema }