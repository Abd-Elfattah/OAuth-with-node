const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../models/user');

// serialize user 
passport.serializeUser((user,done) => {
    done(null,user.id);
});

// deserialize user
passport.deserializeUser( (id,done) => {
    User.findById(id).then( user => done(null,user) );
})

// init passport
passport.use(
    new GoogleStrategy({
        // options for google
        callbackURL : '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        User.findOne({googleID: profile.id}).then( (currentUser) => {
            if( currentUser ) {
                // already have user
                done(null,currentUser);
            } else {
                // user not Found
                new User({
                    name: profile.displayName,
                    googleID: profile.id,
                    image: profile._json.image.url
                }).save().then( (newUser)=>{
                    console.log("user Created" , newUser);
                }).catch( err => console.log(err));  
                done(null,newUser);
            }
        })

    })
)