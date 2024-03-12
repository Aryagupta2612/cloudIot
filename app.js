const express = require("express");
const path = require("path");
require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected successfully.'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(path.join(__dirname, "public_html")));


const UserRoutes = require("./routes/User.route")
app.use("/user", UserRoutes);



// Global error handler middleware
app.use((err, req, res, next) => {
    // Log the error to the console
    console.error(err.stack);

    // Determine the error status code
    let statusCode = err.status || 500;

    // If the error is a ValidationError from Mongoose, set a more appropriate status code
    if (err.name === 'ValidationError') {
        statusCode = 400;
    }

    // Send a JSON response with the error message and status code
    res.status(statusCode).json({
        message: err.message || 'Internal server error'
    });
});

const listnerCallback = () => {
    console.log(`Listening on port: ${process.env.PORT}`);
}

app.listen(process.env.PORT, listnerCallback);