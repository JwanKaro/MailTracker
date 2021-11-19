"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseClientError = exports.DatabaseError = void 0;
class DatabaseError extends Error {
    constructor(DB) {
        super("");
        this.message = `Database Error: ${DB}; Stack: ${this.stack}`;
        this.name = DB;
    }
}
exports.DatabaseError = DatabaseError;
class DatabaseClientError extends Error {
    constructor(DB) {
        super("");
        this.message = `Database Client Error: ${DB}; Stack: ${this.stack}`;
        this.name = DB;
    }
}
exports.DatabaseClientError = DatabaseClientError;
