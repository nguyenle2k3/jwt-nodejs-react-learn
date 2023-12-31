import userService from '../services/userService';
const handlerHelloWorld = (req, res) => {
    return res.render("home.ejs");
}

const handlerUserPage = (req, res) => {
    return res.render("user.ejs");
}

const handlerCreateNewUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    userService.createNewUser(email, password, username);

    return res.send("Create new user!");
}
module.exports = {
    handlerHelloWorld,
    handlerUserPage,
    handlerCreateNewUser,
}