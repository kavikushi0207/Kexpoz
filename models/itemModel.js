const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    item_id:{
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
    Origin:{
        type: String,
        required:true
    },
    price:{
        type: Number,
        required:true,
        trim:true
    },
    images:{
        type: Object,
        required:true,
        
    },
    product:{
        type: String,
        required:true
    },
    checked:{
        type: Boolean,
        default:false
    },
    sold:{
        type: Number,
        default:0
    }

},{
    timestamps : true
})

module.exports = mongoose.model("Item",itemSchema)