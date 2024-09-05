const Home = require('../models/dolistSchema');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// exports.getDashboard = async (req, res) => {
//     try {
//         const examples = await Home.find();
//         res.render('index', { data: examples });
//     } catch (err) {
//         res.status(500).send('Server Error');
//     }
// };


exports.createtodo = async(req,res) => {
    try{
        const todoName = req.body.textBoxValue;
        const homeSchema = new Schema({
            name: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        });
        
        const todo = mongoose.model(todoName, homeSchema);
        module.exports = todo;
        res.json({success:true, todo: todoName});
        
    }
    catch{
        console.log("couldn't send response")
    }
}

exports.getDashboard = async (req, res) => {
    console.log('getDashboard function called');
    try {
        const db = mongoose.connection.useDb('home');
        console.log('Connected to home database');
        const userId = req.user ? req.user._id : null;
        if (!userId) {
            return res.render('index', { notes: new Map(), data: new Map() });
        }
        
        const collections = await db.db.listCollections().toArray(); // Note the use of db.db
        
        
        const notes = new Map();
        const doLists = new Map();

        for (let collection of collections) {
            try {
                const model = db.model(collection.name, new mongoose.Schema({}, { strict: false }), collection.name);
                const firstDoc = await model.findOne({user: userId});
                
                if (firstDoc) {
                    if (firstDoc.hasOwnProperty('text')) {
                        doLists.set(collection.name, firstDoc._id.toString());
                    } else if (firstDoc.hasOwnProperty('content')) {
                        notes.set(collection.name, firstDoc._id.toString());
                    }
                } 
            } catch (err) {
                console.error(`Error processing collection ${collection.name}:`, err);
            }
        }
        
        

        res.render('index', { notes: notes, data : doLists });
    } catch (err) {
        console.error('Error in getDashboard:', err);
        res.status(500).send('Server Error');
    }
};