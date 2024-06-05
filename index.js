
const express = require("express")
const app = express()

let persons =
    [
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

app.get('/api/persons',(request,response)=> {
    response.json(persons);
})


app.get('/info',(request,response)=>{
    const no = persons.map(x =>x.id)
    const len = no.length
    console.log(len)
    const time = new Date()
    response.send(`Phone book has info for ${len} people <br> <br> ${time}` )
})

app.get('/api/persons/:id',function(req,res){
  const id =Number(req.params.id)
  const person = persons.find(x=>x.id === id)
  if(person){
    res.json(person)
  }
  else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id',(req,res)=>{
  const id = Number(req.params.id)
  const person =persons.filter(x=> x.id !== id)
  res.status(204).end()
  
})

// app.post('/api/persons',(req,res)=>{
  
// })
const PORT = "3001"
app.listen(PORT)
console.log<(`Server is listening on port ${PORT}`)