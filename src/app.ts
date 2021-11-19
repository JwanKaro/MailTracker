import { IConfig } from './types';
import DB from './database';
import Router from '@src/router';
import { EventEmitter } from './event/index';
import { DatabaseError } from './Error/DB';

class App {

    config: IConfig;

    db?: DB;

    
    public get SafeDB()  {
        if(!this.db)  throw new DatabaseError(this.db);
        return this.db;
    }
    
    router?: Router;
    private _events?: EventEmitter;
    constructor(config: IConfig) {
        this.config = config;
    }
    async init() {

        // create an event manager
        this._events = new EventEmitter();
    
        // create db connection
        this.db = new DB(this.config);
        this.db.init();


        // initialize router
        this.router = new Router(this.config);
        // load api endpoints
        this.router.loadFolder(__dirname + '/api', this.db);


        return this.router.init();
    }


    public get eventManager(): EventEmitter {
        if (!this._events) {
            this._events = new EventEmitter();
        }
        return this._events;
    }

}

export default App;