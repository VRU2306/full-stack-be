const authService = require('../../services/Auth/auth.service');

const register = async (req, res) => {

    try {
        await authService.register(req, res);
    } catch (error) {
        return res.status(500).send({ errMessage: "Internal Server Error" });
    }
};

const googleRegister = async (req, res) => {

    try {
        await authService.googleRegister(req, res)
    } catch (error) {
        return res.status(500).send({ errMessage: "Internal Server Error" });
    }
};

const login = async (req, res) => {
    try {
        await authService.login(req, res)
    } catch (error) {
        return res.status(500).send({ errMessage: "Internal Server Error" });
    }
};

module.exports = {
    register,
    googleRegister,
    login
}