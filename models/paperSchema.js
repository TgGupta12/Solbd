const mongoose=require('mongoose')

const paperSchema=new mongoose.Schema({
    subject:{
        type:String,
        required:true,
    },
    sem:{
        type:Number,
        required:true,
    },
    year:{
        type:Number,
    },
    exam:{
        type:String,
        enum:["midsem","endsem"]
    },
    queUrl:{
        type:String,
        required:true
    },
    solUrl:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("Paper",paperSchema)