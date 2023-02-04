import template from '../template'
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var compress = require("compression");
var cors = require("cors");
var helmet = require("helmet");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());


app.get("/",(req,res)=>{
    res.status(200).send(template)
})
export default app;
