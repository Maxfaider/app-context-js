# AppContext Module

This module represents a centralized context, which consists of a set of name to object/events/services bindings.

The **AppContext** provides:

- The ability providing configuration information to the application. It is read-write at run time.
- The ability to publish events / services.
- The ability to resolve services names to registered events. 

**A Context instance is not guaranteed to be synchronized against concurrent access by multiple methods async.**

## Install

### NPM
```console
npm i app-context-js
```
## Usage

### CommonJS
```js
var AppContext = require('app-context-js')
```

### ES6 / ES2015 module
```js
import AppContext from 'app-context-js'
```

## Features

### Object bindings global
```js
AppContext.addAttr('name-app', 'Fumoffu-App');
AppContext.addAttr('version', 'v1.0.0');
AppContext.addAttr('env', { properties: 'some properties'});
```
### Publish services
```js
AppContext.Services.publish("User_persistence", { api: "some functions"});
AppContext.Services.publish(
    'Task_persistence', 
    { api: "some functions"}, 
    { info: 'any API, for save tasks'}
);

var userPersistence = AppContext.Services.getService('User_persistence');
var { userPersistence, Taskpersistence} = AppContext.Services.getServices(
    'Task_persistence', 'User_persistence');
```
###  Register/Emit Events

**Events Simple**
```js
import AppContext from 'app-context-js'

function registerUser() {
    // any code
}

AppContext.onEvent('addUser', registerUser);

// other file.js
import AppContext from 'app-context-js'

AppContext.emitEvent('addUser');
```

**Events with properties**
```js
import AppContext from 'app-context-js'

function registerUser(properties) {
    // any code
}

AppContext.onEvent('addUser', registerUser);

// other file.js
import AppContext from 'app-context-js'

var User = {
    name: 'John',
    lastnames: 'Doe'
}

AppContext.emitEvent('addUser', User);
```

**Events with properties and services**
```js
import AppContext from 'app-context-js'

function registerUser(service, properties) {
    // any code
}

function registerTask(services, properties) {
    // any code
}

AppContext.onEvent('addUser', registerUser, 'User_persistence');
AppContext.onEvent('addTask', registerTask, 'Task_persistence', 'User_persistence');

// other file.js
import AppContext from 'app-context-js'

var User = {
    name: 'John',
    lastnames: 'Doe'
}

var task = {
    name: "do nothing",
    owner: User
}

AppContext.emitEvent('addUser', User);
AppContext.emitEvent('addTask', task);
```
