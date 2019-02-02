'use strict';

class Events {
    constructor() {
        this.listeners = new Map();
    }

    addListener(name, callback) {
        this.listeners.set(name, callback);
    }

    getListener(name) {
        return this.listeners.get(name);
    }
}

module.exports = Events;