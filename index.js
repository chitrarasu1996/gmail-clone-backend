// const {app,BrowserWindow} =require("electron")

// const createWindow = () => {
//     const win = new BrowserWindow({
//       width: 800,
//       height: 600
//     })
  
//     win.loadFile('./index.html')
//   }
//   app.whenReady().then(() => {
//     createWindow()
//   })
require("dotenv").config()
const express=require("express");

const cors=require("cors");
const app=express();
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

