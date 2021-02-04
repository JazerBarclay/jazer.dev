require('dotenv').config()

const express = require('express')
const helmet = require('helmet')
const logger = require('morgan')

const app = express()

app.use(logger('dev'))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.send('It Works')
})

const PORT = process.env.PORT || 5000

app.listen( PORT, () => console.log(`Server started on port ${PORT}`) )