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