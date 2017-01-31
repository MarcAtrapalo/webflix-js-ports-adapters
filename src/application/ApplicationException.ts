export default class ApplicationException extends Error {

    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, ApplicationException.prototype);
    }

}
