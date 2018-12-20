const router = require('express').Router();
const passport = require('passport');

// login Route
router.get('/login' , (req,res) => {
    res.render('login' , {user: req.user});
})


// logout Route
router.get('/logout' , (req,res) => {
    req.logout();
    res.redirect('/');
})



// google Route
router.get('/google' , passport.authenticate('google', { scope: ['profile'] }) );


// callback Route for google
router.get('/google/redirect' , passport.authenticate('google') ,(req,res) => {
    res.redirect('/profile');
});
module.exports = router;