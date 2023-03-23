const { timeStamp } = require('console')
const mongoose = require('mongoose')

const roomschema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    maxcount :{
        type:Number ,
        required: true
    },
    rent:{
        type:Number ,
        required:true
    },

    imgurl:[],

    currentbookings:[],

    type:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
},
{
timeStamp : true,
}
)

const roomModel = mongoose.model('room',roomschema)
module.exports= roomModel