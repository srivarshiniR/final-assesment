var express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors= require('cors');
const app = express();
const roomsRoute=require('./router/roomsRoute');
const { json } = require('body-parser');
app.use(cors())

app.use(express.json())
app.use('/api/room',roomsRoute)

require('./db')

//import schemas
require('./model/user')
require('./model/room')

const User=mongoose.model("user");
const Room=mongoose.model("room");


const port=5005;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//post api for registration
const userdata=app.post("/register",async(req,res)=>{

const{name,email,password,number,aadhar,address }= req.body;
    try{

        await User.create({
        name,
        email,
        password,
        number,
        aadhar,
        address

    });
    res.send({message:"successfully registered"})
    data:userdata
}catch(error){
    console.log(error)
    res.send({status:"error"})
}
});

   
   


// app.get("/register",async(req,res)=>{
//     console.log("enters")
//     res.send({status:"ok"})
// })

//post Api for login


app.post("/login",async(req,res)=>{
    const{
        email,password
    }=req.body;
    const user=await User.findOne({email,password});
    //validate email and password
    if (!email || !password) {
        return res.json({ message: 'Email and password are required' });
      }
    //checking existed user
    if(!user){
        return res.json({message: "Invalid user and password"})
    }
    await User.updateOne({email},{$set:{loggedIn: true}});
    res.json({message:"Logged in Successfully"});
})



// app.post('/login',async(req,res)=>{
//     try{
//    const{email,password} = req.body;

//    const details=await User.findOne({email});
   
//    const validate=await compare({password,pass})
//    if(details&&validate){
//     res.send("login succesfull")
//    }
//    else{
//     res.send("user not found")
//    }
  
  
// }
// catch(error){
//     res.send("something went wrong")
// }
// })



//poat Api for rooms

app.post('/room', async(req,res)=>{
    console.log("enter value")
    try{
        console.log("start")
        const{name,maxcount,rent,type,imgurl}=req.body
    const newroom=await Room.create({
            
                name,
                maxcount,
                rent,
                type,
                imgurl
        })
       
        console.log({"status":"ok"})
        res.send({"status":"ok",
        data:newroom
    });

    }
    catch(err){
        console.log("err",err);
    }
}
)
app.get("/room",async(req,res)=>{
    console.log("enters")
    res.send({status:"ok"})
})
   

app.listen(port,()=> console.log('server started @'+port)
    );
