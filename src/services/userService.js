import bcryptjs from 'bcryptjs';
import bluebird from 'bluebird';
import mysql from 'mysql2/promise';

// create connection


// brypt salt
const salt = bcryptjs.genSaltSync(10);

const hashPassword = (userPassword) => {
    let passwordHassed = bcryptjs.hashSync(userPassword, salt);
    return passwordHassed;
};

const createNewUser = async (email, password, username) => {
    const connection = await mysql.createConnection({
        host: 'localhost', 
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    });
    let passwordHassed = hashPassword(password);
    
    try {
        const [rows, fields] = await connection.execute('INSERT INTO users (email, password, username) VALUES (?, ?, ?)', [email, passwordHassed, username]);
        return rows;
    } catch (err) {
        console.log(">>> userService caught error: ", err);
    }
}

const getUserList = async() => {
    const connection = await mysql.createConnection({
        host: 'localhost', 
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    });

    let users = [];
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM users');
        return rows;
    } catch (err) {
        console.log(err);
    }
}

const deleteUser = async (id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    });

    try {
        const [rows, fields] = connection.execute('DELETE FROM users WHERE id = ?', [id]);
        return rows;
    } catch(err) {
        console.log(">>> catch error from userService.deleteUser: ", err);
    }
}

module.exports = {
    createNewUser,
    getUserList,
    deleteUser,
};