const userService = require("../../services/Profile/user.service");

const getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ errMessage: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(id);
        if (!user) {
            return res.status(404).json({ errMessage: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ errMessage: error.message });
    }
};

module.exports = {
    getUsers,
    getUserById,
};
