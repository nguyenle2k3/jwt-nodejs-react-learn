import express, { Router } from "express";
import configViewEngine from "./config/viewEngine";
import initWebRouters from "./routes/web";
import initApiRouters from "./routes/api";
import bodyParser from "body-parser";
import configCors from "./config/cors";
require("dotenv").config();

const app = express();

// config cors
configCors(app);

// config view engine
configViewEngine(app);

// config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// init web routes
initWebRouters(app);

// init api
initApiRouters(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(">>> JWT Backend is running on the port = " + PORT);
});
