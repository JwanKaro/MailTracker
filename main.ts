import "./src/path"

import config from "./main.config";
import App from './src/app';
import { readFileSync } from 'fs';

const readKey = (path: string) => readFileSync(path, 'utf8');

const settings = JSON.parse(readFileSync("settings.json").toString("utf8"));
process.env.JWT_SECRET_PUBLIC = readKey(settings.secrets.paths.jwtPublicKey);
process.env.JWT_SECRET_PRIVATE = readKey(settings.secrets.paths.jwtPrivateKey);

export default App;



// main();

