var assert = require('assert');
var Services = require('../lib/services');

describe('Test: module services', function() {

    describe('Publish Service', function() {
        var services = new Services();
        var api =  { api: "some functions"};

        services.publish('registro_User', api);

        it('resources existent', function() {
            assert.strictEqual(services.getService('registro_User'), api);
        });
    });

    describe('Publish Services', function() {
        var services = new Services();
        var api_user =  { api: "some user api"};
        var api_task = { api: "some task api"};

        services.publish('registro_User', api_user);
        services.publish('registro_Task', api_task);
        
        var result = services.getServices(['registro_User', 'registro_Task']);
        it('resources existent', function() {
            assert.equal(result.registro_User, api_user);
            assert.equal(result.registro_Task, api_task);
        });
    });

  });