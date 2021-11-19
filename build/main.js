"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_config_1 = __importDefault(require("./main.config"));
const app_1 = __importDefault(require("./src/app"));
process.app = new app_1.default(main_config_1.default);
// initialize the app
(async () => { process.app.init(); })();
// TODO:move this 
process.app.eventManager.on('event:opened', (data) => {
    console.log('event:opened', data);
});
