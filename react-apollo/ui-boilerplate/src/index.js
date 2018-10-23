import ReactDOM from "react-dom";
import dotenv from "dotenv";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import { makeMainRoutes } from "./routes";
dotenv.config()

const routes = makeMainRoutes();
ReactDOM.render(routes, document.getElementById("root"));
