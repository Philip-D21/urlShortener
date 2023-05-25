const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();




const urlRouter = require("./route/url");


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())




//routes
app.use("/api/url", urlRouter);



app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
