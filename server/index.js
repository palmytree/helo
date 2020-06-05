require('dotenv').config()
const express = require('express'),
  massive = require('massive'),
  session = require('express-session'),
  ctrl = require('./controller'),
  app = express(),
  { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env

app.use(express.json())
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }
  })
)

app.post('/api/auth/register', ctrl.register)
app.post('/api/auth/login', ctrl.login)
app.get('/api/auth/user', ctrl.getUser)
app.post('/api/auth/logout', ctrl.logout)

app.get('/api/posts', ctrl.getPosts)
app.get('/api/post/:postid', ctrl.getPost)
app.post('/api/post', ctrl.createPost)
app.delete('/api/post/:postid', ctrl.deletePost)

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
}).then(db => {
  app.set('db', db)
  console.log('Database in place')
  app.listen(SERVER_PORT, () =>
    console.log(`Serving and observing on port ${SERVER_PORT}`)
  )
})
