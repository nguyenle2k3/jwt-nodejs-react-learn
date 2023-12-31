const handlerHelloWorld = (req, res) => {
    return res.render("home.ejs");
}

const handlerUserPage = (req, res) => {
    return res.render("user.ejs");
}

module.exports = {
    handlerHelloWorld,
    handlerUserPage
}