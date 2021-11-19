import { HostAddress } from "mongodb";
import { IConfig } from "../src/types";

const config: IConfig = {
    mongoose: {
        url: 'mongodb://127.0.0.1:27017',
        // options:
        dbName: 'MailTracker',
    },
    server: {
        port: 6969
    }
}

//mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false
export default config;