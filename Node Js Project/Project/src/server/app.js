const express = require('express');
const mongoose = require('mongoose');
const allRoutes = require('./routes/allRoutes');
const cookieParser = require('cookie-parser');
var cors = require('cors')


const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(cors())

// view engine
app.set('view engine', 'ejs');

//database connection
const dbURI = 'mongodb+srv://Mansee:mansee@cluster0.gzmpnwb.mongodb.net/mernstack?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes

app.use(allRoutes);