import userService from '../services/userService';
const handlerHelloWorld = (req, res) => {
    return res.render("home.ejs");
}

const handlerUserPage = async (req, res) => {
    let userList = await userService.getUserList();
    return res.render("user.ejs", {userList});
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