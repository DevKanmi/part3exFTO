
const express = require("express")
const dotenv = require("dotenv")

const app = express()
app.use(express.json())
app.use(express.morgan())

const cors = require('cors')
app.use(cors());
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
        },
        {
          "id": 5,
          "name": "Mary Joe",
          "number": "90-72-12-8620"
        } ]

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
//Function used to generate a random id that would be assiged to nw notes posted to our server
function generateid(){
  const maxid = persons.length > 0 ? Math.random(...persons.map(x=>x.id))
                                    : 0
  return maxid + 1
}

app.post('/api/persons',(req,res)=>{
  const personbody= req.body

  if(!personbody.content){
    return res.status(400).json({
      error : 'content missing'
    })
  }
 //the person object is created here that we use to post to our server
  const person = {
    content : personbody.content,
    important : Boolean(personbody.important) || false,
    id : generateid()
  }
  persons = persons.concat(person)
  response.json(person)
})
const PORT = process.env.PORT
app.listen(PORT)
console.log<(`Server is listening on port ${PORT}`)