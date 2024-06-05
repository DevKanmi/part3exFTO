
const express = require("express")
const app = express()
app.use(express.json())
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

  const person = {
    content : personbody.content,
    important : Boolean(personbody.important) || false,
    id : generateid()
  }
  persons = persons.concat(person)
  response.json(person)
})
const PORT = "3001"
app.listen(PORT)
console.log<(`Server is listening on port ${PORT}`)