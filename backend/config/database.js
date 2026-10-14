const mongoose = require('mongoose');

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