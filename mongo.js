const { default: mongoose } = require("mongoose")

const addressschema = new mongoose.schema({
        name : String,
        phone_number : String,
})

const address = mongoose.model('Note',addressschema)

const adress1 =new address ({
   "name": "Arto Hellas", 
   "phone_number": "040-123456"
})