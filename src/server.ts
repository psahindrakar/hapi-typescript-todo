/// <reference path="../typings/index.d.ts" />

import * as Hapi from 'hapi';
import registerExtPlugins from './plugins';
import registerIntPlugins from './app';

const server: Hapi.Server = new Hapi.Server();

server.connection({ 
    port : 9001 
});

registerExtPlugins(server);
registerIntPlugins(server);

 server.start((err) => {
    if(err) console.log(err);
    console.log(server.plugins);
    console.log(`Server is listing on ${server.info.uri}`);
});
