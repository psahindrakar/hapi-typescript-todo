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
    
    private registerRoutes(server, next) {
        server.route([{
            method: 'GET',
            path:'/tasks',
            config: taskController.getTasks()
        },
        {
            method: 'GET',
            path:'/tasks/{id}',
            config: taskController.getTaskById()
        },
        {
            method: 'POST',
            path:'/tasks',
            config: taskController.createTask()
        },
        {
            method: 'PUT',
            path:'/tasks/{id}',
            config: taskController.updateTask()
        },
        {
            method: 'DELETE',
            path:'/tasks/{id}',
            config: taskController.removeTask()
        },
        {
            method : 'POST',
            path : '/auth/login',
            config : taskController.login()
        }]);
    }
    
    register: IHapiPlugin = (server, options, next) => {
        server.bind(this);
        server.dependency(['hapi-sequelize'], this.registerRoutes(server, next));
        next();
    }
}

export = new TaskPlugin();