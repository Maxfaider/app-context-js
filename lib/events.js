'use strict';

class Events {
    constructor() {
        this.listeners = new Map();
    }

    addListener(name, callback, nameServices = []) {
        this.listeners.set(name, { callback: callback, nameServices: nameServices });
    }

    getListener(name) {
        return this.listeners.get(name);
    }
}

module.exports = Events;