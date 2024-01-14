import express, { Router } from "express";
import configViewEngine from "./config/viewEngine";
import initWebRouters from "./routes/web";
import bodyParser from 'body-parser';
require("dotenv").config();

const app = express();

// config after define app defined
app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Method', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Request-With, content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// config view engine
configViewEngine(app);

// config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// init web routes
initWebRouters(app);

// // test connection
// import connection from "./config/connectDB";
// connection();

// 
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(">>> JWT Backend is running on the port = " + PORT);
})