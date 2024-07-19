
require('dotenv').config()
const express = require("express")

const Phonebook = require('./models/address')

const app = express()
app.use(express.json())

const cors = require('cors')
const { default: mongoose } = require('mongoose')
app.use(cors());
// let persons =
//     [
//         {
//           "id": 1,
//           "name": "Arto Hellas", 
//           "number": "040-123456"
//         },
//         { 
//           "id": 2,
//           "name": "Ada Lovelace", 
//           "number": "39-44-5323523"
//         },
//         { 
//           "id": 3,
//           "name": "Dan Abramov", 
//           "number": "12-43-234345"
//         },
//         { 
//           "id": 4,
//           "name": "Mary Poppendieck", 
//           "number": "39-23-6423122"
//         },
//         {
//           "id": 5,
//           "name": "Mary Joe",
//           "number": "90-72-12-8620"
//         } ]

app.get('/api/phonebook',(request,response)=>{
    Phonebook.find({})
      .then(show =>{
        response.json(show)
      })
})

app.post('api/phonebook',(request,response)=>{
  const body = request.body;

  if (body.name === undefined || body.phone_number === undefined) {
    return response.status(400).json({error : 'content missing'})
  }

  const phonebook = new Phonebook({
    name : body.name,
    phone_number: body.phone_number
  })
  phonebook.save()
    .then(saved =>{
      response.json(saved)
    });
});

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server is listening on port ${PORT}`)