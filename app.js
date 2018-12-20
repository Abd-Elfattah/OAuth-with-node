const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const authRoutes = require('./routes/auth-routes');
const profileRoute = require('./routes/profile');

// important to Passport.js OAuth
const passportSetup = require('./config/passport-setup');
const cookieSession = require('cookie-session');
const passport = require('passport');

// Connect to mongoDB 
mongoose.connect( keys.mongoDbID , { useNewUrlParser: true } );

// init express
const app = express();

// set view template engine
app.set('view engine' , 'ejs');

// setup cookies
app.use( cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys:[keys.cookieKeys]
}));

// init passport
app.use(passport.initialize());
app.use(passport.session());

// setup routes
app.use('/auth' , authRoutes);
app.use('/profile' , profileRoute);


// homepage route
app.get('/' , (req,res) => {
    res.render('home' , {user: req.user});
});


app.listen(3000);