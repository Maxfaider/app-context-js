var assert = require('assert');
var Services = require('../lib/services');

describe('Test: module services', function() {
    var services = new Services();
    var api =  { api: "some functions"};
    
    services.publish('someApi', api);
    
    it('Publish Service', function() {
        assert.strictEqual(services.getService('someApi').api, api);
    });
    
    var api_user =  { api: "some user api"};
    var api_task = { api: "some task api"};
    
    services.publish('registerUser', api_user, { info: 'register user'});
    services.publish('registerTask', api_task, { info: 'register task'});
    
    var result = services.getServices(['registerUser', 'registerTask']);
    it('Publish Services', function() {
        assert.strictEqual(result.registerUser.api, api_user);
        assert.strictEqual(result.registerTask.api, api_task);
    });
});