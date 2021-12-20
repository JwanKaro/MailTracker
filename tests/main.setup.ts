import { readFileSync } from 'fs';
import path from 'path';
import App from '../src/app';
import config from './test.config';
const readKey = (path: string) => readFileSync(path, 'utf8');
const rootPath = path.resolve(__dirname, '..');
const settings = JSON.parse(readKey(rootPath + '/settings.json'));
process.env.JWT_SECRET_PUBLIC = readKey(settings.secrets.paths.jwtPublicKey);
process.env.JWT_SECRET_PRIVATE = readKey(settings.secrets.paths.jwtPrivateKey);
process.env.CREATE_CLIENT_KEY = 'AOaemvLQYOtipnRLS3PrN_dw9WAhelNWfw'




process.app = new App(config);
// TODO:move this 
process.app.eventManager.on('event:opened', (data) => {
    console.log('event:opened', data);
});

export default async () => {
    await process.app.init()

};