import express from "express";
import homeControllers from "../controllers/homeControllers";
import apiController from "../controllers/apiController";

const router = express.Router();

/**
 * 
 * @param {*} app : express app
 */

const initWebRouters = (app) => {
    // path, handler
    router.get("/", homeControllers.handlerHelloWorld)
    router.get("/user", homeControllers.handlerUserPage)
    router.get("/users/update-user/:id", homeControllers.getUpdateUser)
    router.post("/users/create-user", homeControllers.handlerCreateNewUser)
    router.post("/users/delete-user/:id", homeControllers.handlerDeleteUser)
    router.post("/users/update-user", homeControllers.handlerUpdateUser)

    // rest api
    // GET - R, POST - C, PUT - U, DELETE - D
    router.get('/api/test-api', apiController.testApi)

    return app.use("/", router);
}

export default initWebRouters;