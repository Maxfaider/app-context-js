var assert = require('assert');
var AppContext = require('../lib/app-context.js');

describe('Test: module AppContext', function() {

    describe('Object bindings global', function() {
        var nameApp = 'fumoffu-app';
        var person = { name: 'Alan M.E', lastnames: 'M.E' }

        AppContext.addAttr('nameApp', nameApp);
        AppContext.addAttr('person', person);

        it('attributes existent', function() {
            assert.strictEqual(AppContext.getAttr('nameApp'), nameApp);
            assert.strictEqual(AppContext.getAttr('person'), person);
        });
    });

    describe('Publish Service', function() {
        var api = { api: "some functions"};

        AppContext.Services.publish('registro_User', api);

        it('services existent', function() {
            assert.strictEqual(AppContext.Services.getService('registro_User'), api);
        });
    });

    describe('Publish Services', function() {
        var api_admin = { api: "some admin api"};
        var api_task = { api: "some task api"};

        AppContext.Services.publish('registro_Admin', api_admin);
        AppContext.Services.publish('registro_Task', api_task);

        var result = AppContext.Services.getServices(['registro_Admin', 'registro_Task']);
        it('services existent', function() {
            assert.equal(result.registro_Admin, api_admin);
            assert.equal(result.registro_Task, api_task);
            assert.equal(AppContext.Services.size(), 3); // registro_Admin, registro_Task, registro_User
        });
    });

    describe('Register/emit Events', function() {
        var flag;
        var props;
        var service_expected;
        var session_expected;

        function register() {
            flag = 1;
        }

        function addCache(properties) {
            props = properties;
        }

        function newSession(service, properties) {
            service_expected = service;
            session_expected = properties;
        }

        AppContext.onEvent('register', register);
        AppContext.onEvent('addCache', addCache);
        AppContext.onEvent('newSession', newSession, 'registro_User');

        AppContext.emitEvent('register');
        it('events existent', function() {
            assert.strictEqual(flag, 1);
            assert.strictEqual(props, book_title)
        });

        var book_title = {book_title: 'El bazar de los malos sueños'};
        AppContext.emitEvent('addCache', book_title);
        it('events existent with properties', function() {
            assert.strictEqual(props, book_title)
        });

        var session = {id: 47385932, value: {username: 'Maxfaider', topic: ['programing', 'chess', 'novelist']}};
        AppContext.emitEvent('newSession', session);
        it('events existent with properties and services', function() {
            assert.strictEqual(session_expected, session);
            assert.ok(service_expected);
        });
    });
});