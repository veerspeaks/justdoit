const Data = require('./dolistSchema');

const mongoose = require('mongoose');



mongoose.connect('mongodb://localhost:27017/home')
    .then(() => {
        console.log('Connected to MongoDB');
        
        // Ensure the data is saved after the connection is established
        const newData = [
            { text: "hey howdy" },
            { text: "Need to pickup the grocery" },
            { text: "Need to add the medicine" }
        ];
    
        Data.insertMany(newData).then(result => {
            console.log('Data saved:', result);
            mongoose.connection.close(); // Close the connection after saving
        }).catch(e => {
            console.error('Error saving data:', e);
            mongoose.connection.close(); // Close the connection on error
        });
    }).catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
    });