const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
require("dotenv").config({ path: "./.env" });
const app = express();


//Database
const connect = require("./db/connect");

//calling the availabe routes
const urlRouter = require("./route/url");
const userRouter = require("./route/user");


//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json())
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: false }));





//routes
app.use("/api/auth", userRouter);
app.use("/api/url", urlRouter);

const port = process.env.PORT||4400;

const start = async () => {
    try {
       await connect(process.env.MONGO_URI)
       .then(() => {
          console.log("Database connected");
       }).catch((err) => {
          console.log("Unable to connect to the database");
          console.log(err);
       });
 
       app.listen(port, () => {
          console.log(`server is running on port ${port}...`);
       });
    } catch (err) {
       console.log(err);
    }
 };
 
 start();
 