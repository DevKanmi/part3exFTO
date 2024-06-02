const express = require("express")
const app = express()


app.get("/" ,(request, response) =>{
    response.send('<h1>hello world</h1>')
})

app.post("/",(req,res)=>{
    res.send("Testing 1....2...")
})
const PORT = "3001"
app.listen(PORT)
console.log('Server is listening on port ${PORT}')