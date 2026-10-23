require('dotenv').config();
const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const cors = require('cors');
const connectDatabase = require('./config/database');
const app = express();
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/user');
const serviceRoutes = require('./routes/services');
const referenceRoutes = require('./routes/references');
const projectRoutes = require('./routes/projects');


//This logs each request to the console
app.use(morgan('dev'));

//This allows the frontend to call my API
app.use(cors());

//This allows the server to accept JSON data in the request body
app.use(express.json());
app.use('/', indexRoutes);
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/references', referenceRoutes);
app.use('/api/projects', projectRoutes);

//This handles 404 errors
app.use((req, res, next) => {
    next(createError(404, "Not Found"));
});

//This handles all other GLOBAL ERRORS
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message,
            status: err.status || 500
        }
    });
});

//This connects to the database 
connectDatabase();

//This starts the server and listens on port 3000
app.listen(3000, () => {
    console.log(`Server running at http://localhost:3000/`);
});
















// const connect = require('express');

// function logger(req, res, next) {
//     console.log(req.method, req.url);
//     next();
// }

// function helloWorld(req, res, next) {
//     res.setHeader('Content-Type', 'application/json');
//     res.send(JSON.stringify(data));
// }

// function gBye(req, res, next) {
//     res.setHeader('Content-Type', 'application/json');
//     res.send("Goodbye World");
// }
// function notfound(req, res, next) {
//     res.setHeader('Content-Type', 'text/plain');
//     res.send("Not Found");
// }

// function getUser(req, res, next) {
//     res.send(temp);
// }

// const app = connect();
// app.use(logger);
// app.use("/hello", helloWorld);
// app.use("/goodbye", gBye);
// app.use("/user", getUser);
// app.get("/api/users/:id", (req, res, next) => {
//     console.log("=====> User ID: " + req.params.id);

//     res.send("=====> User ID: " + req.params.id);
// })
// app.use(notfound);
// app.listen(3000);

// console.log('Server running at http://localhost:3000/');