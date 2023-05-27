const mongoose=require("mongoose");
 const mongoURL=process.env.mongoURL
const db=async()=>{
try{

    await mongoose.connect(mongoURL)
    console.log("db connection established")
}catch(er){
console.log("error while connecting db")
}
}
module.exports=db