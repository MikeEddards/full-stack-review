require('dotenv').config()
const express = require('express')
const session = require('express-session'),
      massive = require('massive'),
      auth_ctrl = require('./controllers/auth_controller')

const app = express()

const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env
app.use(express.json())
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: SESSION_SECRET,
        cookie: {
            maxAge: 1000 * 60 *60
        }
    })
)
massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('data is flowing')
    app.listen(SERVER_PORT, () => console.log(`Doing the stuff on port ${SERVER_PORT}`))
})

app.post('/auth/register', auth_ctrl.register)
app.post('/auth/login', auth_ctrl.login)
app.get('/auth/details', auth_ctrl.getDetails)
app.get('/auth/user', auth_ctrl.getUser)
app.get('/auth/logout', auth_ctrl.logout)
