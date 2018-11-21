import ReactDOM from "react-dom";
import dotenv from "dotenv";
import { makeMainRoutes } from "./routes/routes";
dotenv.config();

const routes = makeMainRoutes();
ReactDOM.render(routes, document.getElementById("root"));
