const UserModel = require("./../models/User.model");

const createUser = async (req, res, next) => {
    try {
        const { fullname, email, mobile, password } = req.body;

        const newUser = new UserModel({
            "fullname": fullname,
            "email": email,
            "mobile": mobile,
            "password": password
        });

        await newUser.save();

        res.send(newUser);
        return;
    } catch (error) {
        next(error);
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const users = await UserModel.find();
        res.send(users);
        return;
    } catch (error) {
        next(error);
    }
}

const getAllOptimized = async (req, res, next) => {
    try {
        const { fullname, email, mobile } = req.query;
        let { page, limit } = req.query;
        if (!page) {
            page = 1;
        }
        if (!limit) {
            limit = 20;
        }
        if (limit > 500) {
            limit = 500;
        }
        const skip = (page * limit) - limit
        const query = {};
        if (fullname) {
            query["fullname"] = fullname;
            // query.fullname = fullname;
        }
        if (email) {
            query["email"] = email;
        }
        if (mobile) {
            query["mobile"] = mobile;
        }

        const users = await UserModel.find(query).skip(skip).limit(limit);

        res.send(users);
        return;
    } catch (error) {
        next(error);
    }
}

module.exports = {
    "createUser": createUser,
    "getAllUsers": getAllUsers
    // "getAllUsers": getAllOptimized
}