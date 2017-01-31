export default class InfrastructureException extends Error {

    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, InfrastructureException.prototype);
    }

}
