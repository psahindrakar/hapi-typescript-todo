import * as Hapi from 'hapi';
import { IHapiPlugin } from '../interfaces';

export default class TaskPlugin implements IHapiPlugin {
    
    registerPlugin(server: Hapi.Server) {
        console.log('Registering TaskPlugin');
        server.register({
            register: this
        });
    }
 
    constructor(server: Hapi.Server) {
        this.register.attributes = {
            name: 'TasksPlugin',
            version: '1.0.0'
        };
    }

    register: any = (server: Hapi.Server, options: any, next: any) => {
        server.bind(this);
        server.dependency(['hapi-swagger'], (server, next) => {
            this.registerRoutes(server, next);
        })
        next();
    };

    private registerRoutes: any = (server: Hapi.Server, next: any) => {
        
        server.route([{
            method: 'GET',
            path:'/{name}',
            config: { 
                handler: (request: Hapi.Request, reply: Hapi.IReply) => {
                    reply(`hello ${request.params['name']}`);
                },
                tags: ['api']
            }   
        }]);
        next();
    };
}