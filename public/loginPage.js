"use strict";
const userForm = new UserForm();

userForm.loginFormCallback = data => {
    ApiConnector.login({...data}, (success, info) => success ? location.reload() : setMessage(isSuccess, info));
};

userForm.registerFormCallback = data => {
    ApiConnector.register({...data}, (success, info) => success ? location.reload() : setMessage(isSuccess, info));
};