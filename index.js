
require("dotenv").config()
const express=require("express");
const app=express();
const cors=require("cors");

const router=require("./routs/auth.routes")
const db=require("./db/connect")
db();
app.use(cors())
app.use(express.json());
app.use("/email",router)

app.get("/",(req,res)=>{
  res.status(200).send({message:"g-mail clone-task"})
})
const port=4000;
app.listen(port,()=>{
  console.log("port is running ",port)
})

