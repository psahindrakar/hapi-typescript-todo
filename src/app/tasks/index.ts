import * as Hapi from 'hapi';
import { IHapiPlugin } from '../interfaces';
import TaskController from './Task.controller';

export default class TaskPlugin implements IHapiPlugin {
  
    private taskController = new TaskController();
    
    attributes = {
         name: 'task-manager',
         version: '1.0.0'
    };
    
    registerPlugin(server: Hapi.Server) {
        server.register({
            register: this
        });
    }
 
    constructor(server: Hapi.Server) {
        this.register.attributes = this.attributes;
    }

    register: any = (server: Hapi.Server, options: any, next: any) => {
        server.bind(this);
        server.dependency(['hapi-sequelize'], this.registerRoutes(server, next));
        next();
    };

    private registerRoutes: any = (server: Hapi.Server, next: any) => {
        
        server.route([{
            method: 'GET',
            path:'/tasks',
            config: this.taskController.getTasks()
        }, {
            method: 'POST',
            path:'/tasks',
            config: this.taskController.createTask()
        }]);
        next();
    };
}