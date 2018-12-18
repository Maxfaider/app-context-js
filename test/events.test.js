var assert = require('assert');
var Events = require('../lib/events');

var events = new Events();

describe('Test: module Events', function() {

    describe('register listener', function() {

        function callback() {
            // empty
        }

        events.addListener('someEvent1', callback);
        events.addListener('someEvent2', callback);
        events.addListener('someEvent3', callback);
        events.addListener('someEvent4', callback);

        it('listener existent', function() {
            assert.ok(events.getListener('someEvent4'));
            assert.ok(events.getListener('someEvent2'));
            assert.ok(events.getListener('someEvent1'));
            assert.ok(events.getListener('someEvent3'));
        });
    });

  });