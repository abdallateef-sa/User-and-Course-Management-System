const express = require('express');
const app = express();
const mongoose = require('mongoose');

const url = "mongodb+srv://abdallateefshohdy0180:DB123@cluster1.hliuk.mongodb.net/courses-platform?retryWrites=true&w=majority&appName=Cluster1";

mongoose.connect(url).then(()=>{
  console.log('database connected');
})

const coursesRouter = require('./routes/coursesRoutes');

const usersRouter = require('./routes/usersRoutes')

// middleware for parsing json data in body of request
app.use(express.json()); // or app.use(bodyParser.json());


// crud operation =>          create ==> post | read ==> get | update ==> patch | delete ==> delete

app.use('/api/courses' , coursesRouter);

app.use('/api/users' , usersRouter);




app.listen(3000, () => {
  console.log('Server running on port 3000');
});