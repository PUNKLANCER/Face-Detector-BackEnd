const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '4545',
    database : 'smart-brain'
  }});


const database = {
  users: [{
    id: '123',
    name: 'Sriven',
    email: 'john@gmail.com',
    entries: 0,
    joined: new Date()
  }],
  secrets: {
    users_id: '123',
    hash: 'wghhh'
  }}

app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => res.send('Hello World!'));
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.post('/findface', (req, res) => {
  database.users.forEach(user => {
    if (user.email === req.body.email) {
      user.entries++
      res.json(user)
    }
  });
  res.json('nope')})
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db,)} )
app.put('/image', (req, res) => {image.handleImagePut(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(3001, () => console.log('Example app listening on port 3001!'))



