const mongoose = require('mongoose');
const User = require('../models/userSchema')
const { auth } = require('../config/firebase');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK using environment variables
const adminConfig = {
    type: process.env.FIREBASE_ADMIN_TYPE,
    project_id: process.env.FIREBASE_ADMIN_PROJECT_ID,
    private_key_id: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_ADMIN_CLIENT_ID,
    auth_uri: process.env.FIREBASE_ADMIN_AUTH_URI,
    token_uri: process.env.FIREBASE_ADMIN_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL
};

// Initialize Firebase Admin
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(adminConfig)
    });
}

exports.signin = async (req, res) => {
    try {
        res.render('signin', { isSignInPage: true });
    } catch (error) {
        res.status(500).send({ message: "Sign-in failed", error });
    }
};

exports.signup = async (req,res) => {
    try{
        res.render('signup', { isSignUpPage: true })
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

exports.signinPost = async (req, res) => {
    try {
        const { idToken } = req.body;

        // Verify the Firebase ID token
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const uid = decodedToken.uid;
        const email = decodedToken.email;
        const displayName = decodedToken.name || '';
        const photoURL = decodedToken.picture || '';

        // Check if user exists in your database
        let user = await User.findOne({ firebaseUID: uid });

        if (!user) {
            // If user doesn't exist, create a new user
            user = new User({
                firebaseUID: uid,
                email: email,
                displayName: displayName,
                photoURL: photoURL,
                // Add any additional fields if necessary
            });
            await user.save();
        }

        // Create a session
        req.session.userId = uid;

        res.json({ success: true });
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({ error: 'Unauthorized' });
    }
};

exports.signout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({ error: 'Error signing out' });
        }
        res.redirect('/signin');
    });
};
