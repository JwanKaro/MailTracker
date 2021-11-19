import config from "./config.test"
import App from "../src/app"

(async () => {
    const app = new App(config)
    await app.init()
    console.log("App initialized");
    if (app.router)
        console.log(app.router?.getDefindedRoutes())

})();