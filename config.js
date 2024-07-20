require('dotenv').config();

module.exports = {
    port: process.env.PORT || 1201,
    mongodbUri: process.env.MONGODB_URI,
    mongodbPassword: process.env.MONGO_DB_PASSWORD,
    mongodbUserName: process.env.MONGO_DB_USERNAME,
    jwtSecret: process.env.JWT_SECRET,
    expiresIn: Number(process.env.TOKEN_EXPIRE_TIME)
};
