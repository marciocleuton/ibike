require("dotenv").config();

const express = require('express');
const mongoose =require('mongoose');
const path = require('path')
const cors = require('cors')

const jwt = require('jsonwebtoken');
const app = express();

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const server = require('http').Server(app);

const io = require('socket.io')(server);

mongoose.connect('mongodb+srv://marcio:MM041116@cluster0-jtcjx.mongodb.net/test?retryWrites=true&w=majority', {useUnifiedTopology: true, useNewUrlParser: true})

app.use((req, res, next) => {
    req.io =io;

    next();
})

app.use(cors());



app.use('/files', express.static(path.resolve(__dirname,'..', 'uploads','resized' )));

app.use(require('./routes'));




  //  app.use(expressValidator());


server.listen(3333);
