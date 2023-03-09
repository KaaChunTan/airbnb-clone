const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const User = require('./models/User.js');
require('dotenv').config()
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'ewrwerwer';

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000',
}));

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));

app.get('/test', (req, res) => {
  res.send('Hello World!');
});

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try{
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt)
    });
    res.json(userDoc);
  } catch(err){
    console.log(err);
    res.status(422).json(err);
  }
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if(userDoc){
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if(passOk){
      jwt.sign({
        email: userDoc.email,
        id: userDoc._id
      }, jwtSecret, {}, (err, token) => {
        if(err) throw err;  
        res.cookie('token', token).json(userDoc);
      })
    } else {
      res.status(422).json({ message: 'Invalid Credentials' });
    }
  }
})

app.get('/profile', async(req, res) => {
  const {token} = req.cookies;
  if(token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if(err) throw err;
      const {name, email, _id} = await User.findById(userData.id)
      res.json({name, email, _id});
    })
  } else {
    res.json(null);
  }
})

app.post('/logout', async(req,res) => {
  res.cookie('token', '').json(true);
})

app.post('/upload-by-link', async(req, res) => {
  const {link} = req.body;
  const newName = 'photo' + Date.now() + '.jpg';
  await imageDownloader.image({
    url: link,
    dest: __dirname + '/uploads/' + newName,
  })
  res.json(newName);
})

const photosMiddleware = multer({
  dest: 'uploads'
})
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
  const uploadedFiles = [];
  for(let i = 0; i < req.files.length; i++) {
    const {path, originalname} = req.files[i];
    const parts = originalname.split('.');
    const ext =  parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace('uploads\\', ''));
  }
  res.json(uploadedFiles);
})

app.listen('4000', () => {
  console.log('Example app listening on port 3000!')
});

// ALYFAsVBqKkG0Woc