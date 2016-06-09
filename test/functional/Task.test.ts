var Tasks = require('../../src/app/tasks');
var Code = require('code');
var Lab = require('lab');

var server = require('../../src/server').default;

// Test shortcuts
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;

lab.test('Create task', function(done) {
    var options = {
        method: 'POST',
        url: '/tasks',
        payload: {
            "title": "task1",
            "description": "Needs to be done",
            "status": false,
        }
    }
    
    server.inject(options, (response) => {
        expect(response.statusCode).to.be.equal(200);
        done();
    });
});


// describe('Tasks plugin', function () {
    
//     it('should be create a task', function (done) {
//         var options = {
//             method: 'POST',
//             url: '/tasks',
//             payload: {
//                 "title": "task1",
//                 "description": "Needs to be done",
//                 "status": false,
//             }
//         }
        
//         server.inject(options, (response) => {
//             expect(response.statusCode).to.be.equal(200);
//             server.stop();
//             done();
//         });
//     });
// });