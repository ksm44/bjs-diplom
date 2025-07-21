"use strict";
const userForm = new UserForm();

userForm.loginFormCallback = data => {
    ApiConnector.login({...data}, ({ success, error }) => {
        success ? location.reload() : userForm.setLoginErrorMessage(error);
    });
};

userForm.registerFormCallback = data => {
    ApiConnector.register({...data}, ({ success, error }) => {
        success ? location.reload() : userForm.setRegisterErrorMessage(error);
    });
};