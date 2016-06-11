import * as Hapi from 'hapi';
import { IHapiPlugin } from '../interfaces';

const hapiAuth = require('hapi-auth-jwt2');

class AuthPlugin {
    constructor() {
        this.register.attributes = {
            name: 'Authentication',
            version: '1.0.0'
        }
    }
    
    private validateFunc(decoded, request, callback) {
        // let Task = request.server.plugins['hapi-sequelize'].db.sequelize.models.Task;
        
        // Task.findById(1).then((task) => {
        //     if(task) return callback(null, true);
            
        //     return callback(null, false);
        // });
        return callback(null, true);
    }
    
    private registerStrategy(server, next) {
        
        server.register(hapiAuth);
        
        server.auth.strategy('token', 'jwt', {
            key: 'BitrootsSoftware987654321!@#$%^&',
            validateFunc: this.validateFunc,
            verifyOptions: {algorithms: ['HS256']}
        });
        
        server.auth.default('token');
    }
    
    register: IHapiPlugin = (server, options, next) => {
        server.bind(this);
        server.dependency(['hapi-sequelize'], this.registerStrategy(server, next));
        next();
    }
}

export = new AuthPlugin();