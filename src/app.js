const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose')
const app = express();

//Connect DB
mongoose.connect('mongodb://localhost/db-todo')
.then(db => console.log('DB is connected'))
.catch(err => console.log(err))

//import Routes
const indexRoutes = require('./routes/index')


//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

//Routes 
app.use('/', indexRoutes);

//Server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});