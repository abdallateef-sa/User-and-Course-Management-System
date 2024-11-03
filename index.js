require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const httpStatusText = require('./utils/httpStatusText');

const url = process.env.MONGO_URL;

mongoose.connect(url).then(() => {
  console.log("database connected");
});

const coursesRouter = require("./routes/coursesRoutes");

const usersRouter = require("./routes/usersRoutes");
const path = require("path");

app.use(cors());

// middleware for parsing json data in body of request
app.use(express.json()); // or app.use(bodyParser.json());

app.use("/uploads" , express.static(path.join(__dirname , "uploads")));

// crud operation =>          create ==> post | read ==> get | update ==> patch | delete ==> delete

app.use("/api/courses", coursesRouter);

app.use("/api/users", usersRouter);


// global middeleware for not found 
app.all('*' , (req, res, next) => {
  return res.status(404).json({status : httpStatusText.ERROR , message : "page not found"})


})

 // global error handler
app.use ((error, req, res, next) => {
  res.status(error.statusCode ||500).json({status : error.statusText || httpStatusText.ERROR , message : error.message , code : error.statusCode || 500 , data : null})
})


app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port 3000");
});
