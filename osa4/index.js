const express = require('express')

require('dotenv').config()
const mongoose = require('mongoose')
const app = require('./app.js')

const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})