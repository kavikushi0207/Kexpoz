const mongoose = require('mongoose')

const countrySchema = new mongoose.Schema({
    country_id:{
        type: String,
        required:true,
        trim: true,
        unique:true
    },
    Name:{
        type: String,
        required:true,
        trim:true
    },
    Description:{
        type: String,
        required:true,
        trim:true
    },
 
    images:{
        type: Object,
        required:true,
        
    }
   

},{
    timestamps : true
})

module.exports = mongoose.model("Country",countrySchema)