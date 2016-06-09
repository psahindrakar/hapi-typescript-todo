import * as Hapi from 'hapi';

export default class TaskController {
        
    constructor() {
        
    }
    
    public createTask() {
        return {
            handler: (request: Hapi.Request, reply: Hapi.IReply) => {
                let Task  = request.server.plugins['hapi-sequelize'].db.sequelize.models.Task;             
                Task.create(request.payload).then((task) => {
                    reply(task);
                });
            },
            tags: ['api'],
            description: 'Get a list of active tasks'
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
}