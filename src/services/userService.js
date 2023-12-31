import bcryptjs from 'bcryptjs';
import Bluebird from 'bluebird';
import mysql from 'mysql2/promise';

// create connection


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

const getUserList = async() => {
    const connection = await mysql.createConnection({
        host: 'localhost', 
        user: 'root',
        database: 'jwt',
        Promise: Bluebird
    });

    let users = [];
    // connection.query(
    //     'SELECT * FROM users',
    //     function(err, results, fields) {
    //         if (err) {
    //             console.log(err);
    //             return users;
    //         }
    //         users = results;
    //         console.log(">>> get user list from userService: ", users);
    //         return users; 
    //     }
    // );
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM users');
        return rows;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    createNewUser,
    getUserList,
};