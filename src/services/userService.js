import bcryptjs from 'bcryptjs';
import bluebird from 'bluebird';
import mysql from 'mysql2/promise';
import db from '../models/index.js'

// create connection


// brypt salt
const salt = bcryptjs.genSaltSync(10);

const hashPassword = (userPassword) => {
    let passwordHassed = bcryptjs.hashSync(userPassword, salt);
    return passwordHassed;
};

const createNewUser = async (email, password, username) => {
    let passwordHassed = hashPassword(password);
    
    try {
        await db.User.create({
            username: username,
            email: email,
            password: passwordHassed
        })
    } catch (err) {
        console.log(">>> userService caught error: ", err);
    }
}

const getUserList = async() => {

    // test relationships
    let newUser = await db.User.findOne({
        where: {
            id: 1
        },
        attributes: ["id", "username", "email"],
        include: {
            model: db.Group
        },
        raw: true,
        nest: true
    })

    let role = await db.Role.findAll({
        include: {
            model: db.Group,
            where: {
                id: 1
            },
            attributes: ["id", "name"]
        },
        raw: true,
        nest: true
    })

    console.log(">>> check new user: ", newUser);
    console.log(">>> check new group: ", role);

    let users = [];
    users = await db.User.findAll();
    return users;
    // const connection = await mysql.createConnection({
    //     host: 'localhost', 
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird
    // });
    // try {
    //     const [rows, fields] = await connection.execute('SELECT * FROM user');
    //     return rows;
    // } catch (err) {
    //     console.log(err);
    // }
}

const deleteUser = async (userId) => {

    await db.User.destroy({
        where: {
            id: userId
        }
    })
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird
    // });

    // try {
    //     const [rows, fields] = connection.execute('DELETE FROM user WHERE id = ?', [id]);
    //     return rows;
    // } catch(err) {
    //     return console.log(">>> catch error from userService.deleteUser: ", err);
    // }
}

const getUserById = async(Id) => {
    let user = {};
    user = db.User.findOne({
        where: {
            id: Id
        }
    })
    return user;
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird
    // });
    // try {
    //     const [rows, fields] = await connection.execute('SELECT * FROM user WHERE id = ?', [Id]);
    //     return rows;
    // } catch(err) {
    //     console.log(">>> catch error from getUserById: ", err);
    // }
    // return [];
}

const updateUserInfor = async (email, username, id) => {

    await db.User.update({
        email: email,
        username: username
    }, {
        where: {
            id: id
        }
    })
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird
    // });
    // try {
    //     const [rows, fields] = await connection.execute('UPDATE user SET email = ?, username = ? WHERE id = ?', [email, username, id]);
    //     return rows;
    // } catch(err) {
    //     console.log(">>> catch error from getUserById: ", err);
    // }
    // return [];
}

module.exports = {
    createNewUser,
    getUserList,
    deleteUser,
    getUserById,
    updateUserInfor,
};