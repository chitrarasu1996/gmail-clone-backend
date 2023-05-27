const emails = require("../models/email.models");

const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken");
const { sendMailTo } = require("../utils/sendMail");
const contentDetails = require("../models/content.model");
const contentModel = require("../models/content.model");
exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const soltingRounds = 12;
        if (!email || !password) {
            return res.status(201).send({ message: "email or password mandetory" })
        }
        const hashedPassword = await bcrypt.hash(password, soltingRounds)

        let newRegister = new emails({ email, password: hashedPassword })

        let newUser = await newRegister.save()
        res.status(201).send({ message: "Email successfully registred", user: newUser })

    } catch (er) {
        res.status(500).send({ message: "internal error " })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(200).send({ message: "email or password mandetory" })
        }
        const foundUser = await emails.findOne({ email })


        if (!foundUser) {
            return res.status(200).send({ message: "user not found" })
        }
        const comparePass = await bcrypt.compare(password, foundUser.password)

        if (!comparePass) {
            return res.status(200).send({ message: "password doesn't match" })
        }

        const jwtToken = await jwt.sign({ email: foundUser.email }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d"
        })

        res.status(201).send({
            message: "user login succefully", userEmail: foundUser.email, jwtToken

        })
    } catch (er) {
        res.status(500).send({ message: "internal server error" })
        console.log(er)
    }
}

exports.sendMail = async (req, res) => {


    try {
        const {  to, sub, content } = req.body

        const verifiedJWT = await jwt.verify(req.headers.jwttoken, process.env.JWT_SECRET_KEY)
        if (!verifiedJWT) {
            return res.status(400).send({ message: "not valid token" })
        }

        let fromEmail = verifiedJWT.email

       

        const mailSent = await sendMailTo(fromEmail, to, sub, content)

        const savedContent=await new  contentDetails({from:fromEmail,to:to,sub:sub,content})
     const contentSaved =await savedContent.save()
     

if(contentSaved){
    res.status(201).send({ message: "email was sent succefully", fromEmail,to,sub,content })
           
}else{
    res.status(200).send({message:"errr while sending message"})
}      

    } catch (er) {
        res.status(500).send({ message: er })
    }
};

exports.getAllMail=async(req,res)=>{

    const allMail=await contentDetails.find({}).then((data)=>{
        res.status(200).send({message:"all email has succefully retrived",mails:data})
    }).catch((er)=>{
        res.status(404).send({message:"error while retriving Email"})
    })
};
exports.deleteMail=async(req,res)=>{
    try{
        const {id}=req.params

const deleteMail=await contentDetails.findByIdAndDelete({_id:id})
if(!deleteMail){
return res.status(200).send({message:"No Email"})
}

if(deleteMail){
    return res.status(200).send({message:"Email was succeesfully deleted"})    
}

    }
    catch(er){
        res.status(500).send({message:"message Internal server error"})
    }
}


exports.getEmailbyId=async(req,res)=>{
try{
    const {id}=req.params
   
   const content=await contentModel.findById({_id:id})
  
   if(content){
   return res.status(200).send({message:"successfully email Retrived",content:content.content})
   }
 res.status(200).send({message:"content not Found"})
  
}catch(er){
    res.status(500).send({message:"Internal server error"})
}
  

}