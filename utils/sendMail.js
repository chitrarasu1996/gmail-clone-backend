const nodemailer=require("nodemailer")

exports.sendMailTo=async(fromAddress,toAddreess,sub,content)=>{
 
try{
    let mailTransport=nodemailer.createTransport({
    
        service:"gmail",

        auth:{
            user:"chitrarasumit@gmail.com",
            pass:"arnohytlhtezqplm"
        }
    })
    let mailDetails={
        from:fromAddress,
        to:toAddreess,
        subject:sub,
        text:content
    }
    
  await  mailTransport.sendMail(mailDetails,(er,data)=>{
     console.log("mail sending start")
        if(er){
            console.log("error while sending email",er)
            return false
        }
        console.log("mail was sent successfully")
        return true
    })
}catch(er){
console.log("error while sending email",er)
return false
}

}