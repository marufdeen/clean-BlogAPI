const validate = require('../helpers/postValidator');

class post {
    constructor(postData) {
        this.postData = postData;
    }

    async _validatePostCreation() {
        return validate(this.postData)
    } 
    async validateEdit() {
        const { error } = await validate(this.postData);
        if(error) return error;
        return this;
    }  
    getTitle() {
        return this.postData.title;
    }

    getContent() {
        return this.postData.content;
    }

    getContentImage() {
        return this.postData.contentImage;
    }

    async execute(){
        const {error} = await this._validatePostCreation(); 
        if(error) return  error
        
        Object.freeze(this.postData);

        return this;
    }
}

module.exports = post