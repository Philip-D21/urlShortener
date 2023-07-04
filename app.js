//importing express
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const helmet = require("helment");
require("dotenv").config({ path: "./.env" });
const rateLimit = require('express-rate-limit')

const app = express();


//Database
const connect = require("./db/connect");

// express rate limiter config
const limiter = rateLimit({
   windowMs: 0.5* 60 * 1000,  // 15 minutes
   max: 4,  // limit each IP to 100 requests per `window` (here, per 15 minutes)
   standardHeaders: true,  // return rate limit info in the `RataeLimit-*` headers
   legacyHeaders: false,  // Disable the `X-RateLimit-*` headers

});
  
//using it as a middleware
app.use(limiter);


//calling the availabe routes
const urlRouter = require("./route/url");
const userRouter = require("./route/user");
const mainRouter = require("./route/base");

//middlewares
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json())
app.use(cors());


app.use(express.static('public'));

// view engine configuration
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({ extended: false  }));



//routes
app.use("/api/auth", userRouter);
app.use("/api/url", urlRouter);
app.use("/", mainRouter);




// Error handling middleware
app.use((req, res, next) => {
    next(createError.NotFound());
  });
  
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ status, message });
  });




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
 