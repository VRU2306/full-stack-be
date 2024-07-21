const User = require("../../models/User/user");

const getUsers = async () => {
    return await User.find();
};

const getUserById = async (id) => {
    return await User.findById(id);
};

module.exports = {
    getUsers,
    getUserById,
};
