"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const DB_1 = require("../Error/DB");
class DB {
    config;
    MongoClient;
    _db;
    constructor(config) {
        this.config = config.db;
    }
    async init() {
        const MongoClients = new mongodb_1.MongoClient(this.config.url);
        try {
            await MongoClients.connect();
            this.MongoClient = MongoClients;
            this._db = this.MongoClient.db(this.config.name);
        }
        catch (error) {
            console.log(error);
            globalThis.process.exit(1);
        }
    }
    get realDB() {
        if (!this._db)
            throw new DB_1.DatabaseError(this._db);
        return this._db;
    }
    get safeMongoClient() {
        if (!this.MongoClient)
            throw new DB_1.DatabaseClientError(this.MongoClient);
        return this.MongoClient;
    }
}
exports.default = DB;
