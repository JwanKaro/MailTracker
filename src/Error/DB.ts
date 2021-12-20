export class DatabaseError extends Error {
	constructor(DB: unknown) {
		super("")
		this.message = `Database Error: ${DB}; Stack: ${this.stack}`
	}
}

export class DatabaseClientError extends Error {
	constructor(DB: unknown) {
		super("")
		this.message = `Database Client Error: ${DB}; Stack: ${this.stack}`
	}
}
