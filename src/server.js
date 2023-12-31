import express, { Router } from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRouters from "./routes/web";
import bodyParser from 'body-parser';
require("dotenv").config();

const app = express();

// config view engine
configViewEngine(app);

// config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// init web routes
initWebRouters(app);

// 
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(">>> JWT Backend is running on the port = " + PORT);
})