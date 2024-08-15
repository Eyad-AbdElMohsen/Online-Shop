class HttpError extends Error {
    constructor (userMessage, path, statusCode = 500){
        super(userMessage)
        this.userMessage = userMessage;
        this.path = path;
        this.statusCode = statusCode;
        this.message = userMessage;
    }
}
module.exports = HttpError