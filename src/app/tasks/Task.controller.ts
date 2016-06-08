import * as Hapi from 'hapi';

export default class TaskController {
        
    constructor() {
        
    }
    
    public getTasks() {
        return {
            handler: (request: Hapi.Request, reply: Hapi.IReply) => {
                console.log(request.server.plugins['hapi-sequelize'].db.sequelize.models.Task);
                reply('Tasks list');
            },
            tags: ['api'],
            description: 'Get a list of active tasks'
        }
    }
}