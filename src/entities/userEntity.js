const { hashPassword } = require("../helpers/password"); 
const validate = require('../helpers/userValidator');

class user {
    constructor(userData) {
        this.userData = userData;
    }

    async _validateSignUp() {
        return validate.validateUserSignUp(this.userData)
    }

    async _hashUserPassword() {
        this.userData.password = await hashPassword(this.userData.password);
    }
 
    async validateLogin() {
        const {error}  = await validate.validateUserLogin(this.userData);
        if(error) return  error
        return this
    }
    
    async validateEdit() {
        const { error } = await validate.validateUserEdit(this.userData);
        if(error) return error;
        return this;
    }

    getUserId() {
        return this.userData.userId
    }

    getfirstName() {
        return this.userData.firstName;
    }

    getlastName() {
        return this.userData.lastName;
    }

    getEmail() {
        return this.userData.email;
    }

    getPassword() {
        return this.userData.password;
    }
    
    async execute(){
        const {error} = await this._validateSignUp(); 
        if(error) return  error

        await this._hashUserPassword(); 
        
        Object.freeze(this.userData);

        return this;
    }
}

module.exports = user