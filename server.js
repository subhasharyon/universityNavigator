const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const postRoute = require('./routes/InsertData');
const validateRoute = require('./routes/Validate');
const validateTokenRoute = require('./routes/ValidateThruToken');
const getDataRoute = require('./routes/GetData');
const editRoute = require('./routes/EditProfile');

dotenv.config();

let app = express();

let authenticate = (req,res,next) => {
    console.log('inside authenticate middleware');
    
    console.log(req.headers.authorization);

    next();
}

app.use(cors());
app.use('/',postRoute);
app.use('/', validateRoute);
app.use('/', validateTokenRoute);
app.use(authenticate);
app.use('/', getDataRoute);
app.use('/',editRoute);

app.listen(process.env.port, () => {
    console.log(`Listening from port:${process.env.port}`);
})



let connectToDB = async () => {

    try {
        await mongoose.connect(process.env.dbPath);
        console.log('Successfully Connected to Database');
    } catch (error) {
        console.log('Unable to Connect',error);
    }
}

connectToDB();