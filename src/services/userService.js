import bcryptjs from 'bcryptjs';
import mysql from 'mysql2';

// create connection
const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root',
    database: 'jwt'
});

// brypt salt
const salt = bcryptjs.genSaltSync(10);

const hashPassword = (userPassword) => {
    let passwordHassed = bcryptjs.hashSync(userPassword, salt);
    return passwordHassed;
};

const createNewUser = (email, password, username) => {
    let passwordHassed = hashPassword(password);
    
    connection.query(
        'INSERT INTO users (email, password, username) VALUES (?, ?, ?)', [email, passwordHassed, username],
        function(err, results, fields) {
            if (err) {
                console.log(err);
            }
        }
    );
}

const getUserList = () => {
    let users = [];
    connection.query(
        'SELECT * FROM users',
        function(err, results, fields) {
            if (err) {
                console.log(err);
            }
        }
    );
}

module.exports = {
    createNewUser,
    getUserList,
};