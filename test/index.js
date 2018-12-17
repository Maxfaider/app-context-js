var Services = require('../lib/services');

var services = new Services();

console.log(services);

services.publish("registro_User", { api: "some functions"});
services.publish("registro_Admin", { api: "some functions"});
services.publish("registro_Person", { api: "some functions"});
services.publish("registro_Employee", { api: "some functions"});

console.log(services.getService("registro_Person"));

console.log(services.getServices("registro_Person", "registro_Employee", "registro_User"));

var AppContext = require('../lib/app-context');

AppContext.Services.publish("User_persistence", { api: "some functions"});

AppContext.Services.publish(
    'Task_persistence', 
    { api: "some functions"}, 
    { info: 'any API, for save tasks'}
);

console.log("aa->" + AppContext.Services.getService('User_persistence'));
AppContext.Services.getServices('Task_persistence', 'User_persistence');

function registerUser(service, properties) {
    console.log(properties);
}

function registerTask(services, properties) {
    console.log(properties);
}

AppContext.onEvent('addUser', registerUser, ['User_persistence']);
AppContext.onEvent('addTask', registerTask, ['Task_persistence', 'User_persistence']);

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