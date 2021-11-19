"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./database"));
const router_1 = __importDefault(require("./router"));
const index_1 = require("./event/index");
const DB_1 = require("./Error/DB");
class App {
    config;
    db;
    get SafeDB() {
        if (!this.db)
            throw new DB_1.DatabaseError(this.db);
        return this.db;
    }
    router;
    _events;
    constructor(config) {
        this.config = config;
    }
    async init() {
        // create an event manager
        this._events = new index_1.EventEmitter();
        // create db connection
        this.db = new database_1.default(this.config);
        this.db.init();
        // initialize router
        this.router = new router_1.default(this.config);
        // load api endpoints
        this.router.loadFolder(__dirname + '/api', this.db);
        return this.router.init();
    }
    get eventManager() {
        if (!this._events) {
            this._events = new index_1.EventEmitter();
        }
        return this._events;
    }
}
exports.default = App;
