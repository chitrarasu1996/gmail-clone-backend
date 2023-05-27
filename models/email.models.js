const mongoose=require("mongoose");

const emailSchema=mongoose.Schema({

    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});


module.exports=mongoose.model("emails",emailSchema)