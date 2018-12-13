'use strict';

class Services {
    constructor() {
        this.Containers = new Map();
    }

    publish(name, service, info = {}) {
        this.Containers.set(name, new Container(name, service, info));
    }

    getService(name) {
        return this.Containers.get(name).service;
    }

    getServiceInfo(name) {
        return this.Containers.get(name).info;
    }

    getServices(...names) {
        var temp_services = {};
        this.Containers.forEach((container, key) => {
            if(names.some( (name) => name === key) )
                temp_services[key] = container.service;
        })
        return temp_services;
    }

    size() {
        return this.Containers.size;
    }
}

class Container {
    constructor(name, service, info) {
        this.name = name;
        this.service = service;
        this.info = info;

        this.info.name = name;
    }
}

module.exports = Services;