import Samurai from "../../src/Samurai/Samurai";
import controllers from "./controllers"

const home_page = new Samurai.Route('/', {controller: 'DefaultController', action: 'index'});

const app = new Samurai();
app.init(controllers);
app.execute(home_page);