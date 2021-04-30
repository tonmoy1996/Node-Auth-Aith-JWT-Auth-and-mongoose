const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
dotenv.config();
//Database Connect
mongoose.connect(process.env.DB_CONNECT, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => console.log('Databse Connect Successfully'))
    .catch(err => console.log("Error Occours", err));

//Import Route
const authRoute = require('./controller/auth');
const postRoute = require('./controller/post');

//middleware
app.use(express.json());


//Route Middleware
app.use('/api/user', authRoute);
app.use('/api/post', postRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server Starts at ${port}`);
})