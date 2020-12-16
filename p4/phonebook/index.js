const { request, response } = require('express')
const morgan = require('morgan')
const express = require('express')
const app = express()
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'))
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path: ', request.path)
    console.log('Body: ', request.body)
    console.log('---')
    next()
}
app.use(express.json())
app.use(requestLogger)
let numbers = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Richard Lee",
        number: "040-123456"
    },
    {
        id: 3,
        name: "Praneet Kedari",
        number: "040-123456"
    },
    {
        id: 4,
        name: "M",
        number: "040-123456"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(numbers)
})

app.get('/info', (request, response) => {
    response.send(`<h1>Phonebook has info for ${numbers.length} people.</h1><h3>${new Date()}</h3>`)
    
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = numbers.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(204).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    numbers = numbers.filter(number => number.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'either the name or number is missing'
        })
    }
    const found = numbers.find(person => person.name === body.name)
    if (found) {
        return response.status(400).json({
            error: 'this person already exists in the phonebook'
        })
    }

    const number = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 1000)
    }

    numbers = numbers.concat(number)

    response.json(numbers)
}) 

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})