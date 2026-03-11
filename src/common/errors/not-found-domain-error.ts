export class NotFoundDomainError extends Error {
    constructor( message = 'Resource not found' ) {
        super( message );

        this.name = NotFoundDomainError.name;
    }
}