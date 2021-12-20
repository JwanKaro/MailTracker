import { IConfig, IConfigDb } from '../@types';
import { Db, MongoClient } from 'mongodb';
import { DatabaseClientError, DatabaseError } from '../Error/DB';

class DB {
	config: IConfigDb;
	private MongoClient?: MongoClient;
	private _db?: Db;
	constructor(config: IConfig) {
		this.config = config.db;

	}
	async init() {
		const MongoClients = new MongoClient(this.config.url);
		try {
			await MongoClients.connect();
			this.MongoClient = MongoClients;
			this._db = this.MongoClient.db(this.config.name);
		} catch (error) {
			console.log(error);
			globalThis.process.exit(1);
		}
	}
	get realDB() {
		if (!this._db) throw new DatabaseError(this._db);
		return this._db;
	}
	private get safeMongoClient() {
		if (!this.MongoClient) throw new DatabaseClientError(this.MongoClient);
		return this.MongoClient;
	}
}

export default DB;