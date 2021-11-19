import config from "./main.config";
import App from './src/app';

process.app = new App(config);
// initialize the app
(async()=>{process.app.init()})();

// TODO:move this 
process.app.eventManager.on('event:opened', (data) => {
    console.log('event:opened', data);
});
