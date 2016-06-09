/// <reference path="../typings/index.d.ts" />

import * as Hapi from 'hapi';
import Manifest from './config/manifest';

import taskplugin from './app/tasks';

console.log(taskplugin);

// import registerExtPlugins from './plugins';
// import registerIntPlugins from './app';

const Glue = require('glue');

const composeOptions = {
    relativeTo: __dirname + '/../src'
}

Glue.compose(new Manifest().get("/"), composeOptions, function(err, server) {
    if(err) throw err; 
    
    server.start((err) => {
        if(err) return console.log(err);
        console.log(`Server is listing for api on ${server.connections[0].info.uri}`);
        console.log(`Server is listing for doc on ${server.connections[1].info.uri}`);
    });
});

// export default () => {
//     return Glue.compose(manifest, composeOptions, function(err, server) {
//         server.start((err) => {
//             if(err) console.log(err);
//                 console.log(`Server is listing on ${server.info.uri}`);
//         });
        
//         return server;
//     });
// }




// const server: Hapi.Server = new Hapi.Server();

// server.connection({ 
//     port : 9001 
// });

// // registerExtPlugins(server);
// // registerIntPlugins(server);

// server.start((err) => {
//     if(err) console.log(err);
//     console.log(`Server is listing on ${server.info.uri}`);
// });

// export default server;