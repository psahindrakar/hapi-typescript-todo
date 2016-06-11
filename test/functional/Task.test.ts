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

let token;

import Manifest from '../../src/config/manifest';

const composeOptions = {
    relativeTo: __dirname + '/../../src'
}

class ApiServer {
    private static apiServer;
    
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

describe('Task', () => {
    
    lab.before((done) => {

        let user = {
            email: 'saurabh@gmail.com',
            password: 'bitroots5'
        }

        ApiServer.getServer((server) => {

            server.inject({
                method: 'POST',
                url: '/api/v1/auth/login',
                payload: user
            }, (response) => {

                token = response.result.token;
                done();
            });
        });
    });

    it('should create a valid Task', (done) => {
        
        let payload = {
            "title": "task1",
            "description": "Needs to be done",
            "status": false,
        }
        
        ApiServer.getServer((server) => {                                    
            server.inject({
                method: 'POST',
                url: '/api/v1/tasks',
                payload: payload,
                headers: {Authorization: 'bearer ' + token}
            }, (response) => {

                Code.expect(response.statusCode).to.equal(200);
                Code.expect(response.result).to.be.an.object();
                Code.expect(response.result.title).to.equal(payload.title);
                Code.expect(response.result.description).to.equal(payload.description);
                Code.expect(response.result.status).to.equal(payload.status);
                done();
            });
        });
    });
    
    lab.test('it should give array of tasks', (done) => {
        
        ApiServer.getServer((server) => {                                    
            server.inject({
                method: 'GET',
                url: '/api/v1/tasks',
                headers: {Authorization: 'bearer ' + token}
            }, (response) => {

                Code.expect(response.statusCode).to.equal(200);
                Code.expect(response.result).to.be.an.array();
                Code.expect(response.result[0]).to.be.an.object();
                done();
            });
        });
    });
    
    lab.test('it should return task', (done) => {
        
        ApiServer.getServer((server) => {                                    
            server.inject({
                method: 'GET',
                url: '/api/v1/tasks/1',
                headers: {Authorization: 'bearer ' + token}
            }, (response) => {

                Code.expect(response.statusCode).to.equal(200);
                Code.expect(response.result).to.be.an.object();
                done();
            });
        });
    });
    
    lab.test('it should update the given task by Id', (done) => {
        
        let payload = {
            "title": "task5",
            "description": "Needs to be done",
            "status": false,
        }
        
        ApiServer.getServer((server) => {                                    
            server.inject({
                method: 'PUT',
                url: '/api/v1/tasks/1',
                payload: payload,
                headers: {Authorization: 'bearer ' + token}
            }, (response) => {

                Code.expect(response.statusCode).to.equal(200);
                Code.expect(response.result).to.be.an.object();
                Code.expect(response.result.title).to.equal(payload.title);
                Code.expect(response.result.description).to.equal(payload.description);
                Code.expect(response.result.status).to.equal(payload.status);
                done();
            });
        });
    });
    
    lab.test('it should remove task from database', (done) => {
        
        ApiServer.getServer((server) => {                                    
            server.inject({
                method: 'DELETE',
                url: '/api/v1/tasks/1',
                headers: {Authorization: 'bearer ' + token}
            }, (response) => {

                Code.expect(response.statusCode).to.equal(200);
                Code.expect(response.result).to.equal(1);
                done();
            });
        });
    });
});