const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: "./.env" });
const app = express();


//Database
const connect = require("./db/connect");

//calling the availabe routes
const urlRouter = require("./route/url");
const userRouter = require("./route/user");
const mainRouter = require("./route/main");

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json())
app.use(cors());
// app.use(flash())
app.use(express.static('public'));

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({ extended: false  }));



//routes
app.use("/api/auth", userRouter);
app.use("/api/url", urlRouter);
app.use("/", mainRouter);



// Basic route
// app.get('/', (req, res) => {
//     res.render('landing')
//   });
  

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
 