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

const updateUser = async (req, res, next) => {
    try{ 
        const userId = req.params.id;
        const { fullname, email, mobile, password } = req.body;

        const user =  await UserModel.findById(userId);

        if(!user){
            return res.status(404).json({ error: 'User not found '});
        }
        user.fullname = fullname || user.fullname;
        user.email = email || user.email;
        user.mobile = mobile || user.mobile;
        user.password = password || user.password;

        // Save the updated user
        await user.save();

        res.json(user);
    } catch (error) {
        next(error);
    }


    }

    const deleteUserById = async (req, res, next) => {
        try {
            const userId = req.params.id;

            const deletedUser = await  UserModel.findOneAndDelete({ _id: userId });
            if(!deletedUser) {
                return res.status(404).json({error: 'User not found'});

            }

            res.json({ message: 'User deleted successfully', user: deletedUser})
    

        }

        catch(error){
            next (error);
        }

    }


const getAllOptimized = async (req, res, next) => {
    try {
        const { fullname, email, mobile } = req.query;
        let { page, limit } = req.query;

        page = parseInt(page) || 1;
        limit = parseInt(limit) || 20;

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

        if (fullname) query.fullname = { $regex: new RegExp(fullname, 'i') };
        if (email) query.email = { $regex: new RegExp(email, 'i') };
        if (mobile) query.mobile = { $regex: new RegExp(mobile, 'i') };
        // if (fullname) {
        //     query["fullname"] = fullname;
        //     // query.fullname = fullname;
        // }
        // if (email) {
        //     query["email"] = email;
        // }
        // if (mobile) {
        //     query["mobile"] = mobile;
        // }

        const users = await UserModel.find(query).skip(skip).limit(limit);
        const totalRecords = await UserModel.countDocuments(query);

        res.json({
            page,
            limit,
            totalRecords,
            totalPages: Math.ceil(totalRecords / limit),
            data: users
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    "createUser": createUser,
    "getAllUsers": getAllUsers,
    "updateUser": updateUser,
    "deleteUserById": deleteUserById,
     "getAllUsers": getAllOptimized
}