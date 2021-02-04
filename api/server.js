require('dotenv').config()

const express = require('express')
const helmet = require('helmet')
const logger = require('morgan')
var fs = require('fs');

const app = express()

// Logging to file ( flag 'a' to append )
app.use(logger('common', {
    stream: fs.createWriteStream('./logs/access.log', {flags: 'a'})
}));

// Logging to console if not running in production
if(app.get("env")!="production") app.use(logger('dev'));

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.status(200).json({
        status: 1, message: "welcome to jazer.dev/api"
    })
})

const PORT = process.env.PORT || 5000

app.listen( PORT, () => console.log(`Server started on port ${PORT}`) )
.on('error', console.log)