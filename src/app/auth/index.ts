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
    
    private validateFunc(decoded, reqeuest, callback) {
        callback(null, true);
    }
    
    private registerStrategy(server, next) {
        server.register(hapiAuth);
        
        server.auth.strategy('token', 'jwt', {
            key: 'BitrootsSoftware987654321!@#$%^&',
            validateFunc: this.validateFunc,
            verifyOptions: {algorithms: ['HS256']}
        });
        
        server.auth.default('token');
        
        next();
    }
    
    register: IHapiPlugin = (server, options, next) => {
        server.bind(this);
        server.dependency(['hapi-sequelize'], this.registerStrategy(server, next));
        next();
    }
}

export = new AuthPlugin();