const mongoose = require('mongoose');
const User = require('../models/userSchema')
const passport = require('passport')

exports.signin = async (req, res) => {
    try {
        // Your logic for handling sign-in
        res.render('signin')
    } catch (error) {
        res.status(500).send({ message: "Sign-in failed", error });
    }
};

exports.signup = async (req,res) => {
    try{
        
        res.render('signup')

    }catch(e) {
        res.status(500).send({ message: "Sign-in failed", e});
    }
}

exports.signupPost = async (req, res) => {
    try{
        
        const {username, password} = req.body
        const user = await User.findOne({username})
        if(!user){
            const newUser = new User({username, password})
            await newUser.save()
            req.flash('success_msg', 'Account created successfully, please log in to continue')
            res.redirect('/signin')
            
        }else{
            console.log('user already exist')
            res.redirect('/signin')
        }
    }
    catch(e){
        console.log(e)
    }
}

exports.signinPost = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);  // Make sure to pass req, res, and next to the function
};

exports.signout = (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/signin');
    });
};
