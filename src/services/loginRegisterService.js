import db from "../models/index";
import bcryptjs from "bcryptjs";

// brypt salt
const salt = bcryptjs.genSaltSync(10);

const hashPassword = (userPassword) => {
	let passwordHassed = bcryptjs.hashSync(userPassword, salt);
	return passwordHassed;
};

const checkEmailExist = async (email) => {
	let user = await db.User.findOne({
		where: {
			email: email,
		},
	});

	if (user) {
		return true;
	}
	return false;
};
const checkPhoneExist = async (phone) => {
	let user = await db.User.findOne({
		where: {
			phone: phone,
		},
	});

	if (user) {
		return true;
	}
	return false;
};
const registerNewUser = async (rawUserData) => {
	try {
		// check email/phone number are existed
		let isEmailExist = await checkEmailExist(rawUserData.email);
		if (isEmailExist === true) {
			return {
				EM: "The email is already existed!",
				EC: 1,
			};
		}
		let isPhoneExist = await checkPhoneExist(rawUserData.phone);
		if (isPhoneExist === true) {
			return {
				EM: "The phone number is already existed!",
				EC: 1,
			};
		}
		// hash user password
		let hashUserPassword = hashPassword(rawUserData.password);

		// create new user
		await db.User.create({
			email: rawUserData.email,
			username: rawUserData.username,
			phone: rawUserData.phone,
			password: hashUserPassword,
		});
		return {
			EM: "A User is created successfully!",
			EC: 0,
		};
	} catch (error) {
		console.log(error);
		return {
			EM: "Somethings went wrong in service!",
			EC: -2,
		};
	}
};

module.exports = {
	registerNewUser,
};
