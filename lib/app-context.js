'use strict';

var Services = require('./services');
var Events  = require('./events');

var attributes = {};
var services = new Services();
var events = new Events();

module.exports = {
    setAttribute(name, value) {
        attributes[name] = value;
    },
    getAttribute(name) {
        return attributes[name];
    },
    onEvent(name, callback) {
        events.addListener(name, callback);
    },
    emitEvent(name, properties = {}, ...nameServices) {
        var callback = events.getListener(name);
        if(callback) {
            if(nameServices.length !== 0)
                callback(services.getServices(nameServices), properties);
            else
                callback(properties);
        }
    },
    Services: services
}