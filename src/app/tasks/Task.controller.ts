import * as Hapi from 'hapi';

export default class TaskController {
        
    constructor(private server: Hapi.Server) {
        
    }
    
    public getTasks() {
        return {
            handler: (request: Hapi.Request, reply: Hapi.IReply) => {
                reply('Tasks list');
            },
            tags: ['api'],
            description: 'Get a list of active tasks'
        }
    }
}