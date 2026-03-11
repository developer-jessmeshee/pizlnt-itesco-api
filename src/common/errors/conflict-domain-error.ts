export class ConflictDomainError extends Error {
    constructor ( message = 'Conflict' ) {
        super( message );

        this.name = ConflictDomainError.name;
    }
}