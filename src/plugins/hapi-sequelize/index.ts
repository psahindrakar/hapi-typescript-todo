import * as Hapi from 'hapi';
import { IPlugin, IPluginInfo } from '../interfaces';

const HapiSequelize = require('hapi-sequelize');

export default (): IPlugin => {
    
    return {
        register: (server: Hapi.Server) => {
            server.register([
                {
                    register: HapiSequelize,
                    options: {
                        name: 'TodoSqliteDb',                   
                        dialect: 'sqlite',
                        models: '../../app/**/*.model.js',
                        storage: '../../todo-db.sqlite',
                        sequelize: {                          
                            define: {
                                underscoredAll: true,
                                timestamps: true                             
                            }
                        }
                    }
                }
            ], (err) => {
                if(err) console.log(err);
            });
        },
        info: () => {
            return {
                name: 'hapi-sequelize',
                version: '2.2.4'
            }
        }    
    }
}
