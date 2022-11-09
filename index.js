///const http = require('http')
const {application, request, response } = require('express')
const express = require('express')
const app = express()
app.use(express.json())

let phonebook = [
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
        "number": "39-23-6423122"}
        ,
      {
        "id": 5,
        "name": "Fuck M",
        "number": "1234223122"}
]

currentDate = new Date();
    startDate = new Date(currentDate.getFullYear(), 0, 1);
    var days = Math.floor((currentDate - startDate) /
        (24 * 60 * 60 * 1000));
         
    var weekNumber = Math.ceil(days / 7);

app.get('/api/persons', (request, response) => {
  response.json(phonebook)
})

app.get('/info', (request,response) => {
  response.send(`Phonebook has info for ${phonebook.length} people <br> ${currentDate} ${weekNumber}`)
  
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const personid = phonebook.find(note => note.id === id)
  if (personid) {
    response.json(personid)
  }else{
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  phonebook = phonebook.filter(person => person.id !== id)
  response.status(204).end()
})

const generateID = () => {
  const maxId = phonebook.length > 0
    ? Math.max(...phonebook.map(n => n.id))
    : 0
  return maxId + 1
}
app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }
  if (!body.number){
    return response.status(400).json({
      error: 'number missing'
    })
  }
  
  for (let i = 0;i < phonebook.length;i++){
    if (body.name === phonebook[i].name) {
      return response.status(400).json({
        error: 'name must be unique'
      })
    }
  }
  
  const person = {
    id: generateID(),
    name: body.name,
    number: body.number
  }
  phonebook = phonebook.concat(person)
  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})