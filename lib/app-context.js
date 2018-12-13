'use strict';

var Services = require('./services');
var Events  = require('./events');

var attr = {};
var services = new Services();
var events = new Events();

module.exports = {
    addAttr(name, value) {
        attr[name] = value;
    },
    getAttr(name) {
        return attr[name];
    },
    onEvent(name, callback, ...nameServices) {
        events.addListener(name, callback, nameServices);
    },
    emitEvent(name, properties = {}) {
        var listener = events.getListener(name);
        if(listener) {
            if(listener.nameServices.length !== 0)
                listener.callback(services.getServices(listener.nameServices), properties);
            else
                listener.callback(properties);
        }
    },
    Services: services
}