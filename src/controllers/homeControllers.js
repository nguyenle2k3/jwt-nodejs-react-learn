import mysql from 'mysql2';

// create connection
const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root',
    database: 'jwt'
});

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

    connection.query(
        'INSERT INTO users (email, password, username) VALUES (?, ?, ?)', [email, password, username],
        function(err, results, fields) {
            if (err) {
                console.log(err);
            }
            console.log(results);
        }
    )
    return res.send("handlerCreateNewUser");
}
module.exports = {
    handlerHelloWorld,
    handlerUserPage,
    handlerCreateNewUser,
}