const mongoose=require('mongoose')
require('dotenv').config();
const connect=async()=>{
    try{
        await mongoose.connect(process.env.URL,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
        console.log("connection to db successfull")
    }
    catch(err){
        console.log("err in connection to db",err)
    }
}

module.exports=connect