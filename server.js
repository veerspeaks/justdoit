const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const session = require('express-session')
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/userSchema')
const passport = require('passport')
const flash = require('connect-flash')

const app = express();

//middleware

app.use(express.json());  //body parser middleware
app.use(express.urlencoded({ extended: true }));   //body parser middleware
app.use(express.static(path.join(__dirname, 'public')));  //static folder   
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(flash())


//view engine

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//Database connection

const db = process.env.MONGO_URI

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));



//flash middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success')
    res.locals.error_msg = req.flash('error')
    next()
})

function checkAuthenticated(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    }
    res.redirect('/signin');
}

//routes
const signinRoute = require('./routes/signinRoute');
app.use('/', signinRoute);

const exampleRoutes = require('./routes/route');
app.use('/', checkAuthenticated, exampleRoutes);

const dolistroute = require('./routes/dolistRoute');
app.use('/dolist', checkAuthenticated, dolistroute);

const noteRoute = require('./routes/noteRoute');
app.use('/notes', checkAuthenticated, noteRoute);




//listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));