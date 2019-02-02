'use strict';

class Services {
    constructor() {
        this.Containers = new Map();
    }

    publish(name, api, info = {}) {
        this.Containers.set(name, {name, api, info});
    }

    getService(name) {
        return this.Containers.get(name);
    }

    getServices(names = []) {
        var temp_services = {};
        this.Containers.forEach((container, key) => {
            if(names.some( (name) => name === key) )
                temp_services[key] = container;
        })
        return temp_services;
    }

    size() {
        return this.Containers.size;
    }
}

module.exports = Services;