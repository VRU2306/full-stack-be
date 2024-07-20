const express = require("express");
const mongoose = require("mongoose")
const app = express();
const cors = require('cors')
const config = require('./config');
const bodyParser = require('body-parser');
const authRoutes = require("./routes/Auth/auth.router");
app.use(cors())
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const username = config.mongodbUserName;
const password = config.mongodbPassword;
const uri = config.mongodbUri
    .replace("<username>", username)
    .replace("<password>", password);
mongoose.connect(uri);
mongoose.connection.once('open', () => {
    console.log('Connected to the database');
});
app.all("/");

app.use("/api/auth", authRoutes)

const port = config.port;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});