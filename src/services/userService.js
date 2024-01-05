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
        const [rows, fields] = await connection.execute('INSERT INTO user (email, password, username) VALUES (?, ?, ?)', [email, passwordHassed, username]);
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
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM user');
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
        const [rows, fields] = connection.execute('DELETE FROM user WHERE id = ?', [id]);
        return rows;
    } catch(err) {
        return console.log(">>> catch error from userService.deleteUser: ", err);
    }
}

const getUserById = async(Id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    });
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM user WHERE id = ?', [Id]);
        return rows;
    } catch(err) {
        console.log(">>> catch error from getUserById: ", err);
    }
    return [];
}

const updateUserInfor = async (email, username, id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    });
    try {
        const [rows, fields] = await connection.execute('UPDATE user SET email = ?, username = ? WHERE id = ?', [email, username, id]);
        return rows;
    } catch(err) {
        console.log(">>> catch error from getUserById: ", err);
    }
    return [];
}

module.exports = {
    createNewUser,
    getUserList,
    deleteUser,
    getUserById,
    updateUserInfor,
};