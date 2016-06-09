import * as Hapi from 'hapi';
import { IHapiPlugin } from '../interfaces';
import TaskController from './Task.controller';

const taskController = new TaskController();

class TaskPlugin {
    constructor() {
        this.register.attributes = {
            name: 'task-manager',
            version: '1.0.0'    
        }
    }
    
    register: IHapiPlugin = (server, options, next) => {
        server.bind(this);
        // server.dependency(['hapi-sequelize'], this.registerRoutes(server, next));
        
        server.route([{
            method: 'GET',
            path:'/tasks',
            config: taskController.getTasks()
        }, {
            method: 'POST',
            path:'/tasks',
            config: taskController.createTask()
        }]);

        next();
    }
}

export = new TaskPlugin();