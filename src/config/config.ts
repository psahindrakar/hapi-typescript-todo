const Confidence = require('confidence');

const criteria = {
    env: process.env.NODE_ENV
}

const prefixStr = '/api/v1';

const config = {
    $meta: 'This is project configuration store',
    projectName: 'TODO typescript app',
    port: {
        api: {
            $filter: 'env',
            test: 9000,
            $default: 9001 
        }, 
        doc: {
            $filter: 'env',
            test: 9002,
            $default: 9003
        }
    },
    prefix: prefixStr,
    hapiSequelize: {
        $filter: 'env',
        production: {
            
        },
        test: {
            
        },
        $default: {
            sqlite: {
                name: 'TodoSqliteDb',                   
                dialect: 'sqlite',
                models: 'build/src/app/**/*.model.js',
                storage: '../../todo-db.sqlite',
                sequelize: {                          
                    define: {
                        underscoredAll: true,
                        timestamps: true                             
                    }
                }   
            }   
        }                
    }, 
    hapiSwagger: {
        $filter: 'env',
         production: {
            
        },
        test: {
            
        },
        $default: {
            info: {
                title: 'Task API'
            },
            tags: [
                {
                    'name': 'tasks',
                    'description': 'API tasks interface'
                }
            ],
            connectionLabel: 'web',
            enableDocumentation: true,
            documentationPath: '/docs',
            pathPrefixSize: 3,
            basePath: prefixStr
            
        }
    }
}

export default class Config {
    private store; 
    
    constructor() {
        this.store = new Confidence.Store(config);
    }
    
    public get(key: string) {
        return this.store.get(key, criteria);
    }
    
    public meta(key: string) {
        return this.store.meta(key, criteria);
    }
}