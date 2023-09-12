const express = require('express');
const app = express();
require('dotenv').config()
const path = require('path')
const morgan = require('morgan');
app.use(require("body-parser").json());
const jwt = require("jsonwebtoken");

app.use(morgan('dev'));
app.use(require("body-parser").json());

app.use((req, res, next) => {
    const auth = req.headers.authorization;
    const token = auth?.startsWith("Bearer") ? auth.slice(7) : null;
    try {
      const { id } = jwt.verify(token, process.env.JWT);
      req.userID = id;
    } catch (err) {
      req.userID = null;
    }
    next();
  });
app.use(express.static(path.join(__dirname, '../client/dist')))

app.get('/', (req, res ) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html' ))
})
app.get('/game', (req, res ) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html' ))
})

app.use('/api', require('./api'));
app.use('/auth', require('./auth'));

app.listen(process.env.PORT, (error) => {
    if(!error){
        console.log(`Server is listening on ${process.env.PORT}`);
    } else {
        console.log('Not Working')
    }
})