const express=require("express");
const { register, login, sendMail,getAllMail,deleteMail,getEmailbyId } = require("../controller/auth.controller");


const router=express.Router();

router.post("/register",register)
router.post("/login",login)
router.post("/send-email",sendMail)
router.get("/allmail",getAllMail)
router.delete("/deletemail/:id",deleteMail)
router.get("/findemail/:id",getEmailbyId)

module.exports=router;
