'use strict';

var Code = require('code');
var Lab = require('lab');
const Path = require( 'path' );
const Glue = require( 'glue' );

// Test shortcuts
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;

import Manifest from '../../src/config/manifest';

const composeOptions = {
    relativeTo: __dirname + '/../../src'
}

class ApiServer {
    private static apiServer = undefined;
    
    public static getServer(callback) {
        
        if(ApiServer.apiServer) return callback(ApiServer.apiServer);
        
        Glue.compose(new Manifest().get("/"), composeOptions, function(err, server) {

            if (err) throw err;
            
            console.log('Creating an instance of webserver');
            ApiServer.apiServer = server.select('web');
            return callback(ApiServer.apiServer);
        });
    }
}

lab.experiment('Simple', () => {

    lab.test('test1', (done) => {
        
        ApiServer.getServer((server) => {                                    
            server.inject({
                method: 'POST',
                url: '/api/v1/tasks',
                payload: {
                    "title": "task1",
                    "description": "Needs to be done",
                    "status": false,
                }
            }, (response) => {

                Code.expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });
    
    lab.test('test2', (done) => {
        
        ApiServer.getServer((server) => {                                    
            server.inject({
                method: 'POST',
                url: '/api/v1/tasks',
                payload: {
                    "title": "task1",
                    "description": "Needs to be done",
                    "status": false,
                }
            }, (response) => {

                Code.expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });
});