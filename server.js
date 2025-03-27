const express=require('express')
const paperRoute=require('./routes/paperRoutes')
const dbConnect=require('./config/dbConnect')

const cors=require('cors')



const app=express()
require('dotenv').config()
app.use(cors())
dbConnect();
app.use(express.json())
app.use("/api/paper",paperRoute)
const Port=process.env.PORT || 4000;

app.get("/",(req,res)=>{
    res.send("Paper Backend working properly")
})

app.listen(Port,()=>{
    console.log(`app is listening at ${Port}`)
})
