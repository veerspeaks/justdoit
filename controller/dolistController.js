const mongoose = require('mongoose');

// Controller to receive the data
exports.gettodo = async (req, res) => {
    try {
        const dolistName = req.params.dolistName; // e.g., 'music'
        const userId = req.user._id;
        // Use the `home` database to access the specific collection dynamically
        const TodoModel = mongoose.connection.useDb('home').model(dolistName, new mongoose.Schema({}, { strict: false }), dolistName);
    
        // Fetch the data from the collection
        const todos = await TodoModel.find({user: userId});
    
        // Send the data to the client
        res.render('dolist', { data: todos });
    
    } catch (err) {
        console.error(err); // Log the error for debugging purposes
        res.status(500).send("Server Error");
    }
};

// Controller for getting the added text from the client and adding it to the DB
exports.addtodo = async (req, res) => {
    try {
        const dolistName = req.params.dolistName; // e.g., 'music'
        const todoText = req.body.todoText;
        const userId = req.user._id;
        
        // Use the `home` database to access the specific collection dynamically
        const TodoModel = mongoose.connection.useDb('home').model(dolistName, new mongoose.Schema({}, { strict: false }), dolistName);
        
        // Create a new todo in the specified collection
        const newTodo = new TodoModel({ text: todoText, user: userId });
        const savedTodo = await newTodo.save();
        
        res.json({ success: true, todo: savedTodo });
    } catch (e) {
        res.status(500).json({
            success: false,
            error: e.message,
        });
    }
};

// Controller to update a todo
exports.updatetodo = async (req, res) => {
    try {
        const dolistName = req.params.dolistName; // e.g., 'music'
        const todoId = req.params.id; // Get the ID from the route parameters
        const todoText = req.body.todoText;
        const userId = req.user._id;

        // Use the `home` database to access the specific collection dynamically
        const TodoModel = mongoose.connection.useDb('home').model(dolistName, new mongoose.Schema({}, { strict: false }), dolistName);
        
        // Update the todo in the specified collection
        const updatedTodo = await TodoModel.findByIdAndUpdate(
            todoId,
            { text: todoText, user: userId },
            { new: true }
        );
        
        res.json({ success: true, todo: updatedTodo });
    } catch (e) {
        res.status(500).json({
            success: false,
            error: e.message,
        });
    }
};

// Controller to delete a todo
exports.deletetodo = async (req, res) => {
    try {
        const dolistName = req.params.dolistName; // e.g., 'music'
        const todoId = req.params.id; // Get the ID from the route parameters
        const userId = req.user._id;

        // Use the `home` database to access the specific collection dynamically
        const TodoModel = mongoose.connection.useDb('home').model(dolistName, new mongoose.Schema({}, { strict: false }), dolistName);
        
        // Delete the todo in the specified collection
        await TodoModel.findByIdAndDelete({_id: todoId, user: userId});
        
        res.json({ success: true, message: "Todo deleted successfully" });
    } catch (e) {
        res.status(500).json({
            success: false,
            error: e.message,
        });
    }
};
