const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const defaultRoute = require('./routes/index');
const studentAPI = require('./api/students.js');
const studentController = require('./controllers/studentController');
const courseAPI = require('./api/courses.js');
const courseController = require('./controllers/courseController');
const registrationAPI = require('./api/registrations.js');
const registrationController = require('./controllers/registrationController');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'vash');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap/dist')))
app.use('/jquery', express.static(path.join(__dirname, '/node_modules/jquery/dist')))

app.use('/', defaultRoute);
app.use('/api/students', studentAPI);
app.use('/student', studentController);
app.use('/api/courses', courseAPI);
app.use('/course', courseController);
app.use('/api/registrations', registrationAPI);
app.use('/registration', registrationController);


const port = process.env.PORT || 5000; 
app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});