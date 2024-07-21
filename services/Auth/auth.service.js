const User = require("../../models/User/user");
const bcrypt = require('bcryptjs');
const auth = require("../../middleware/auth");
const config = require("../../config");
const { validateRegistrationData, validateGoogleRegistrationData, validateLoginData } = require("../../helpers/validation");

const register = async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        validateRegistrationData(req.body);

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).send({ errorMsg: "An account with that email already exists!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const userName = Date.now().toString(36).toUpperCase();

        const newUser = new User({
            email,
            username: userName,
            name: `${firstName} ${lastName}`,
            password: hash,
            firstName,
            lastName,
            googleSignedInUser: false
        });

        await newUser.save();

        const token = await auth.generateToken(newUser._id, userName);
        const responseUser = {
            token,
            id: newUser._id,
            email: newUser.email,
            username: newUser.username,
            name: newUser.firstName + " " + newUser.lastName,
            firstName: newUser.firstName,
            expiresIn: config.expiresIn,
            lastName: newUser.lastName,
            googleSignedInUser: false
        };
        return res.status(201).send(responseUser);
    } catch (err) {
        console.error(err);
        return res.status(500).send({ errorMsg: "Something went wrong" });
    }
};
const googleRegister = async (req, res) => {
    try {
        validateGoogleRegistrationData(req.body);

        const { name, email } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            if (user.googleSignedInUser === true) {
                const token = await auth.generateToken(user._id, user.username);
                const responseUser = {
                    token,
                    id: user._id,
                    email: user.email,
                    username: user.username,
                    expiresIn: config.expiresIn,
                    name: user.name,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    googleSignedInUser: true
                };
                return res.status(200).send(responseUser);
            } else {
                return res.status(400).send({ errorMsg: "An account with that email already exists!" });
            }
        } else {
            const userName = Date.now().toString(36).toUpperCase();
            const [firstName, lastName] = name.split(" ");
            const newUser = new User({
                email,
                username: userName,
                name,
                firstName: firstName ?? "",
                lastName: lastName ?? "",
                googleSignedInUser: true
            });
            await newUser.save();
            const token = await auth.generateToken(newUser._id, newUser.username, { expiresIn: 24 * 60 * 60 });
            const responseUser = {
                token,
                id: newUser._id,
                email: newUser.email,
                username: newUser.username,
                expiresIn: 24 * 60 * 60,
                name: newUser.name,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                googleSignedInUser: newUser.googleSignedInUser
            };
            return res.status(201).send(responseUser);
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send({ errorMsg: "Something went wrong" });
    }
};
const login = async (req, res) => {
    try {
        validateLoginData(req.body);
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ errorMsg: "No user found with this email" });
        }
        if (user.googleSignedInUser === true) {
            return res.status(400).send({ errorMsg: "You have signed up using different method!" });
        }

        if (user.password && user.googleSignedInUser === false) {
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                return res.status(400).send({ errorMsg: "Invalid login credentials!" });
            }
        }

        const token = auth.generateToken(user.email, user.username);
        const responseUser = {
            token,
            id: user._id,
            email: user.email,
            expiresIn: config.expiresIn,
            username: user.username,
            name: user.firstName + " " + user.lastName,
            firstName: user.firstName,
            lastName: user.lastName,
            googleSignedInUser: user.googleSignedInUser
        };

        return res.status(200).send(responseUser);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ errorMsg: "Internal Server Error" });
    }
};

module.exports = {
    register,
    googleRegister,
    login
};
