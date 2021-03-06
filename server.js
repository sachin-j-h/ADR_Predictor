// This is the server file

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})
const db = mongoose.connection

db.on("error", err => console.error(err))
db.once("open", () => console.log("Connected to mongoose"))

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(express.static(__dirname + '/public'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts)

const indexRouter = require('./routes/index')
const drugRouter = require('./routes/drugs')

app.use('/', indexRouter)
app.use('/drugs', drugRouter)


app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running...")
})