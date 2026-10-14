const mongoose = require('mongoose');

//This creates a connection to the MongoDB database using Mongoose. 
//It uses the connection URL specified in the environment variable [MONGO_CONNECTION_URL]
 async function connectDatabase(){
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_URL);
        console.log("Connected to MongoDB Atlas (Portfolio Database)");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
        
    }
}

module.exports = connectDatabase;