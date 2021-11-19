export class DatabaseError extends Error {
    constructor(DB: any) {
        super("");
        this.message = `Database Error: ${DB}; Stack: ${this.stack}`;
        this.name = DB;
    }
}

export class DatabaseClientError extends Error {
    constructor(DB: any) {
        super("");
        this.message = `Database Client Error: ${DB}; Stack: ${this.stack}`;
        this.name = DB;
    }
}
