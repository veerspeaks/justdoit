const mongoose = require('mongoose');
const Note = require('../models/noteSchema');  // Import the note schema

// Retrieve all notes from a collection using the standardized schema
exports.getNotes = async (req, res) => {
    try {
        const userId = req.user._id;
        const notename = req.params.notename;
        const noteModel = mongoose.connection.useDb('home').model(notename, Note.schema, notename);
        const notes = await noteModel.find({user: userId });
        
        res.render('notes', { data: notes });
    } catch (err) {
        console.error('Error fetching notes:', err);
        res.status(500).send('Server Error');
    }
};

// Update an existing note or create a new one if it doesn't exist
exports.updateNote = async (req, res) => {
    try {
        const { noteContent } = req.body;
        const userId = req.user._id;
        const notename = req.params.notename;

        const noteModel = mongoose.connection.useDb('home').model(notename, Note.schema, notename);
        const updateResult = await noteModel.updateOne(
            { user: userId },
            { $set: { content: noteContent, user: userId} },
            { upsert: true }
        );

        if (updateResult.upsertedCount > 0) {
            res.status(201).json('New note created');
        } else if (updateResult.modifiedCount > 0) {
            res.status(200).json('Note updated');
        } else {
            res.status(200).json('No changes made to the note');
        }
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Server Error', message: err.message });
    }
};

// Create a new note collection (or simply return the name for validation purposes)
exports.createNote = async (req, res) => {
    try {
        const notename = req.params.notename;
        
        res.status(201).json({message: 'note created', notename: notename});
    } catch (err) {
        console.error('Error creating note:', err);
        res.status(500).json({ error: 'Server Error', message: err.message });
    }
};


// Delete a specific note
exports.deleteNote = async (req, res) => {
    try {
        const userId = req.user._id;    
        const notename = req.params.notename;
        const noteModel = mongoose.connection.useDb('home').model(notename, Note.schema, notename);
        await noteModel.deleteOne({ userId });
        res.status(200).json('Note deleted');
    } catch (err) {
        console.error('Error deleting note:', err);
        res.status(500).send('Server Error');
    }
};
