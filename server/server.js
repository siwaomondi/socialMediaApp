import app from "./express";
import config from "./../config/config";
// import mongoose from "mongoose"

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    // useCreateIndex: true, //are no longer supported
    // useUnifiedTypology: true,
}).then(result => console.info("database connected")).catch(err=>console.info(err));
mongoose.connection.on("error", () => {
    // throw new Error(`unable to connect to database: ${config.mongoUri}`);
    throw new Error(`unable to connect to database ${mongoUri}`);
});

app.listen(config.port, (err) => {
    // console.info(mongoUri)
    if (err) {
        console.log(err);
    }
    console.info("Server started on port %s.", config.port);
    console.info(Math.round((new Date().valueOf() * Math.random())) +"")
});
