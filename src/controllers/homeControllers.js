import userService from '../services/userService';
const handlerHelloWorld = (req, res) => {
    return res.render("home.ejs");
}

const handlerUserPage = async (req, res) => {
    let userList = await userService.getUserList();
    return res.render("user.ejs", {userList});
}

const handlerCreateNewUser = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    await userService.createNewUser(email, password, username);
    return res.redirect("/user");
}

const handlerDeleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id);
    return res.redirect("/user");
}

module.exports = {
    handlerHelloWorld,
    handlerUserPage,
    handlerCreateNewUser,
    handlerDeleteUser,
}