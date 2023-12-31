import express from "express";
import homeControllers from "../controllers/homeControllers";

const router = express.Router();

/**
 * 
 * @param {*} app : express app
 */

const initWebRouters = (app) => {
    router.get("/", homeControllers.handlerHelloWorld)
    router.get("/user", homeControllers.handlerUserPage)

    router.post("/users/create-user", homeControllers.handlerCreateNewUser)
    router.post("/users/delete-user/:id", homeControllers.handlerDeleteUser)

    return app.use("/", router);
}

export default initWebRouters;