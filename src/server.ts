/// <reference path="../typings/index.d.ts" />

import * as Hapi from 'hapi';
import registerExtPlugins from './plugins';
import Tasks from './app/tasks';
// import registerIntPlugins from './app';

const server: Hapi.Server = new Hapi.Server();

server.connection({ 
    port : 9001 
});

registerExtPlugins(server);
// registerIntPlugins(server);
server.register([
    Tasks
], (err) => {
    if(err) console.log(err); 
})

 server.start((err) => {
    if(err) console.log(err);
    console.log(`Server is listing on ${server.info.uri}`);
});
