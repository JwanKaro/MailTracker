import { IConfig } from './src/@types';
import path from 'path';

const config: IConfig = {
	db: {
		url: process.env.mongodbUrl || 'mongodb://127.0.0.1:27017',
		name: 'MailTracker',
	},
	server: {
		port: process.env.PORT || 3450,
		enteryPoint: path.join(__dirname, 'src/www'),
	},
	app: {
		name: 'Mail tracker',
		database: {
			tracker: {
				name: 'tracker'
			},
		},
	},
};
console.log(__dirname);

export default config;
