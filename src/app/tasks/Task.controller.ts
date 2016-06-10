import * as Hapi from 'hapi';
import * as validationRules from './Task.validate'

export default class TaskController {
        
    constructor() {
        
    }
    
    public createTask() {
        return {
            handler: (request: Hapi.Request, reply: Hapi.IReply) => {
                let Task = request.server.plugins['hapi-sequelize'].db.sequelize.models.Task;             
                Task.create(request.payload).then((task) => {
                    reply(task);
                });
            },
            tags: ['api'],
            description: 'Create a List of Daily Task',
            validate: validationRules.createTaskModel
        }
    }
    
    public getTasks() {
        return {
            handler: (request: Hapi.Request, reply: Hapi.IReply) => {
                let Task  = request.server.plugins['hapi-sequelize'].db.sequelize.models.Task;             
                Task.findAll().then((tasks) => {
                    reply(tasks);
                });
            },
            tags: ['api'],
            description: 'Get a list of active tasks'
        }
    }
    
    public getTaskById() {
        return {
            handler: (request: Hapi.Request, reply: Hapi.IReply) => {
                let Task  = request.server.plugins['hapi-sequelize'].db.sequelize.models.Task;             
                Task.findById(request.params['id']).then((task) => {
                    reply(task);
                });
            },
            tags: ['api'],
            description: 'Get a list of active tasks',
            validate: validationRules.Id
        }
    }
    
    public updateTask() {
        return {
            handler: (request: Hapi.Request, reply: Hapi.IReply) => {
                let Task  = request.server.plugins['hapi-sequelize'].db.sequelize.models.Task;             
                Task.update(request.payload, {
                    where: {id: request.params['id']}
                }).then((tasks) => {
                    reply(tasks);
                });
            },
            tags: ['api'],
            description: 'Get a list of active tasks',
            validate: validationRules.Id
        }
    }
    
    public removeTask() {
        return {
            handler: (request: Hapi.Request, reply: Hapi.IReply) => {
                let Task  = request.server.plugins['hapi-sequelize'].db.sequelize.models.Task;             
                Task.destroy({
                    where: {id: request.params['id']}
                }).then((tasks) => {
                    reply(tasks);
                });
            },
            tags: ['api'],
            description: 'Get a list of active tasks',
            validate: validationRules.Id
        }
    }
}