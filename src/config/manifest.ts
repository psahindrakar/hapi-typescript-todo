// import Confidence from 'confidence';
const Confidence = require('confidence');
import Config from './config';

const config = new Config();
const apiLabel: string = 'web';
const docLabel: string = 'docs';

const criteria = {
    env: process.env.NODE_ENV
}

const manifest = {
    $meta: 'This file defines plugins configurations',
    server: {
        connections: {
            routes: {
                security: true,
                cors: false
            }
        }
    },
    connections: [
        {
            port: config.get('/port/api'),
            labels: [apiLabel]
        },
        {
            port: config.get('/port/doc'),
            labels: [docLabel]
        }
    ],
    registrations: [
        {
            plugin: 'blipp'             
        },
        {
            plugin: 'inert'
        },
        {
            plugin: 'vision',
            options: {
                select: [docLabel]
            }
        },
        {
            plugin: {
                register: 'hapi-sequelize',
                options: config.get('/hapiSequelize/sqlite')
            },
            options: {
                select: [apiLabel]
            }
        },
         {
            plugin: {
                register: 'hapi-swagger',
                options: config.get('/hapiSwagger')
            },
            options: {
                select: [docLabel]
            }
        },
        {
            plugin: './app/tasks',
            options: {
                select: [apiLabel],
                routes: {
                    prefix: config.get('/prefix')
                }
            }
        }
    ]
}

const store = new Confidence.Store(manifest);

export default class Manifest {

    public get(key: string) {
        return store.get(key, criteria);
    };
    
    public meta(key: string) {
        return store.meta(key, criteria);
    };
}