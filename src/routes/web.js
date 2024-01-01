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
    router.get("/users/update-user/:id", homeControllers.getUpdateUser)

    router.post("/users/create-user", homeControllers.handlerCreateNewUser)
    router.post("/users/delete-user/:id", homeControllers.handlerDeleteUser)
    router.post("/users/update-user", homeControllers.handlerUpdateUser)

    return app.use("/", router);
}

export default initWebRouters;