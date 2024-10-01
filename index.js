const express = require('express');
const { body, validationResult } = require('express-validator');
const coursesController = require('./controllers/courseController');
const app = express();

// middleware for parsing json data in body of request
app.use(express.json()); // or app.use(bodyParser.json());


const coursesRouter = require('./routes/coursesRoutes');
app.use('/api/courses' , coursesRouter);



app.listen(3000, () => {
  console.log('Server running on port 3000');
});

 