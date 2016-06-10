/// <reference path="../typings/index.d.ts" />

import * as Hapi from 'hapi';
import Manifest from './config/manifest';

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