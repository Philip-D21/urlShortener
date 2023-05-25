const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");



require("dotenv").config({ path: "./.env" });
const app = express();

const urlRouter = require("./route/url");


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())




//routes
app.use("/api/url", urlRouter);


const start = async () =>{
   try{
        await connect(process.env.URI)
        .then(()=>{
            console.log("databse connected")
        })
        .catch((err)=>  {
            console.log("Unable to connect to database");
            console.log(err);
        });

        app.listen(port, () => {
            console.log(`server is running on port ${port}...`)
        })
   } catch(err){
    console.log(err);
   }

}

start();