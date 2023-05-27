const mongoose=require("mongoose");

const contentSchema=mongoose.Schema({
from:{
    type:String,
    required:true
},
to:{
    type:String,
    required:true
},
sub:{
    type:String,
    required:true
},
content:{
    type:String,
    required:true
}

});

module.exports=mongoose.model("content",contentSchema)