const jwt = require('jsonwebtoken');
const User = require('../models/User/user');
const config = require('../config');

const generateToken = (email, userName) => {
    const token = jwt.sign({ email, userName },
        config.jwtSecret, {
        expiresIn: config.expiresIn,
    });
    return token.toString();
};

const verifyToken = async (req, res, next) => {
    try {
        if (!req.headers["authorization"])
            return res
                .status(401)
                .send({ errMessage: "Authorization header not found!" });

        const header = req.headers["authorization"];
        const token = header.split(" ")[1];

        await jwt.verify(token, config.jwtSecret, async (err, verifiedToken) => {
            if (err)
                return res
                    .status(401)
                    .send({ errMessage: "Authorization header is invalid !", details: err });
            const user = await User.findById(verifiedToken.id);
            req.user = user;
            next();
        });
    } catch (error) {
        return res
            .status(500)
            .send({
                errMesage: "Something went Wrong!",
                details: error.message,
            });
    }
};

module.exports = {
    generateToken,
    verifyToken
};
