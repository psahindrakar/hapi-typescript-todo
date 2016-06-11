import * as Joi from 'joi'

export const createTaskModel = {
    payload: Joi.object().keys({
        title: Joi.string().required().default('Task1').description('Task Title'),
        description: Joi.string().required().default('Demo Task One').description('Provide Info of the task'),
        status: Joi.boolean().default(false).description('Completion Status. Onlytrue/false')
    })
}

export const Id = {
	params: {
		id:	Joi.number().min(1).positive().required().default(1)
	}
}

export const login = {
	payload: Joi.object().keys({
		email: Joi.string().email().required().default('saurabh@gmail.com').description('Regitstered Email').trim(),
		password: Joi.string().required().default('bitroots5').description('Encrypted Password when made live').regex(/^[a-zA-Z0-9]{3,30}$/).trim()
	})
}