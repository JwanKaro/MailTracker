import { IConfig } from './@types';
import DB from './database';
import { Router } from './router';
import { EventEmitter } from './event/index';
import { DatabaseError } from './Error/DB';
import { Server } from 'http';
class App {

	config: IConfig;
	#initlized = false;
	db?: DB;
	router?: Router;
	private _server?: Server;
	public eventManager: EventEmitter;

	public get SafeDB() {
		if (!this.db) throw new DatabaseError(this.db);
		return this.db;
	}

	constructor(config: IConfig) {
		this.config = config;
		this.eventManager = new EventEmitter();
	}
	async init() {
		if (this.#initlized) return this;
		// create db connection
		this.db = new DB(this.config);
		this.db.init();


		// initialize router
		this.router = new Router(this.config);
		// load api endpoints
		await this.router.loadFolder(this.config.server.enteryPoint);


		this._server = this.router.init();
		this._server
		this.#initlized = true;
		return this;
	}


	

}

export default App;