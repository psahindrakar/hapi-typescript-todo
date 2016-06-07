import * as Hapi from 'hapi';
import { IPlugin, IPluginInfo } from '../interfaces';

const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');

export default (): IPlugin => {
    
    return {
        register: (server: Hapi.Server) => {
            server.register([
                Inert,
                Vision,
                {
                    register: HapiSwagger,
                    options: {
                        info: {
                            title: 'Task API'
                        },
                        tags: [
                            {
                                'name': 'tasks',
                                'description': 'API tasks interface'
                            }
                        ],
                        enableDocumentation: true,
                        documentationPath: '/docs'
                    }
                }
            ], (err) => {
                if(err) console.log(err);
            });
        },
        info: () => {
            return {
                name: 'Swagger documentation',
                version: '6.1.0'
            }
        }    
    }
}
