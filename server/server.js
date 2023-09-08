const express = require('express');
const app = express();
require('dotenv').config()
const path = require('path')
const morgan = require('morgan')

app.use(morgan('dev'));

app.use('/api', require('./api'))

app.use(express.static(path.join(__dirname, '../client/dist')))

app.get('/', (req, res ) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html' ))
})

app.listen(process.env.PORT, (error) => {
    if(!error){
        console.log(`Server is listening on ${process.env.PORT}`);
    } else {
        console.log('Not Working')
    }
})