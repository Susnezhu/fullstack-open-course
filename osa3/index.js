const express = require("express")
const morgan = require("morgan")
const app = express()

app.use(express.json())
app.use(morgan("tiny"))

const path = require('path')

app.use(express.static(path.join(__dirname, 'client', 'dist')))

app.get('/{*any}', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

console.log('__dirname:', __dirname);
console.log('Static folder:', path.join(__dirname, 'client', 'build'));


let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.get("/info", (request, response) => {
    const quantity = persons.length
    const time = new Date()
    response.send(`
        <p>Phonebook has info for ${quantity} people </p>
        <p>${time}</p>`)
})

app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id.toString()

    persons = Object.values(persons).filter(person => person.id !== id)
    
    response.status(204).end()
})

app.post("/api/persons", (request, response) => {
    try {
        const {name, number} = request.body

        if (!name || !number) {
            return response.status(400).json({error: "name or number is missing"})
        }

        const nameExists = persons.some(person => person.name.toLowerCase() === name.toLowerCase())

        if (nameExists) {
            return response.status(409).json({error: "Name already exist"})
        }

        const newPerson = {
            id: Math.floor(Math.random() * 1000000).toString(),
            name,
            number
        }
        persons.push(newPerson)

        return response.status(201).json(newPerson)

    } catch (error) {
        console.log(error)
    }
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})