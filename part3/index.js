
const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

let persons = [
        { 
          "id": 1,
          "name": "Arto Hellas", 
          "number": "040-123456"
        },
        { 
          "id": 2,
          "name": "Ada Lovelace", 
          "number": "39-44-5323523"
        },
        { 
          "id": 3,
          "name": "Dan Abramov", 
          "number": "12-43-234345"
        },
        { 
          "id": 4,
          "name": "Mary Poppendieck", 
          "number": "39-23-6423122"
        }
    ]

app.use(cors())

morgan.token('person', (req) => {
  if (req.method === 'POST') return JSON.stringify(req.body)
  return null
})

app.use(express.json())


app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :person',
  ),
)

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})


app.get('/info', (request, response) => {
    const res = `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
    `
    response.send(res)
  })

app.post('/api/persons',(req, res) =>{
  const body = req.body
  console.log(body)

  if (!body.name){
    return res.status(400).json({
      error: 'name is missing'
    })
  }
  if (!body.number){
    return res.status(400).json({
      error: 'number is missing'
    })
  }
  const uniquePerson = persons.find(person => person.name === body.name)
  console.log(uniquePerson)
  if(uniquePerson){
    return res.status(400).json({
      error: 'Name is already in phonebook'
    })

  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }
  persons = persons.concat(person)
  res.json(person)

})


app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})