import {IConfig} from './src/types';

const config:IConfig = {
  db: {
    url: 'mongodb://127.0.0.1:27017',
    name: 'MailTracker',
  },
  server: {
    port: 6969,
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

export default config;
