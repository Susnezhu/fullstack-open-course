require('dotenv').config()
const Person = require('./models/person.js')

const express = require("express")
const morgan = require("morgan")
const app = express()

app.use(express.json())
app.use(morgan("tiny"))

const path = require('path')



app.get('/api/persons', (request, response) => {
    Person.find({}).then(person => {
        response.json(person)
    })
})

app.get("/api/persons/:id", (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

app.get("/info", (request, response) => {
    const quantity = 0
    Person.find(person => {
        quantity++
    })
    const time = new Date()
    response.send(`
        <p>Phonebook has info for ${quantity} people </p>
        <p>${time}</p>`)
})

app.delete("/api/persons/:id", (request, response) => {
    Person.findByIdAndDelete(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => {
            response.status(500).json({ error: 'deletion failed' })
        })
})

app.post("/api/persons", (request, response) => {
    const body = request.body

    if (!body.name && !body.number) {
        return response.status(400).json({ error: 'content missing' })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

app.use(express.static(path.join(__dirname, 'client', 'dist')))

app.get('/{*any}', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})