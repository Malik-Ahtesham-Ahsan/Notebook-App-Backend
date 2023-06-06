const express = require("express")
const router = express.Router();
const User =require('../models/Userschema');
const bcrypt =require("bcryptjs")
const jwt=require("jsonwebtoken")
const {body,validationResult}=require('express-validator');
const fetchuser =require('../middleware/fetchuser')

const JWT_SECRET ='maikisagoodboy'
router.post('/createuser',[
    body('name','enter a valid name').isLength({min:3}),
    body('email','eneter valid email').isEmail(),
    body('password','passward must min 5 charac').isLength({min:5}),

],async (req, res) => {


    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try{
        let user =await User.findOne({email:req.body.email});
        if (user)
        {
            return res.status(400).json({err:"soryy user already exist"})
        }
        const  salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt)
        // console.log(secPass)
        user =await User.create({
            name:req.body.name,
            password:secPass,
            email:req.body.email,
        })
        const data={
            user:{
                id:user.id
            }
        }
        const authtoken =jwt.sign(data,JWT_SECRET)
        // console.log(jwtdata)
        // res.json(user)
        res.json(authtoken)
    }catch(err)
    {
        // console.err(err.message);
        res.status(500).send("some error occured");
    }
   
    // .then(user=>res.json(user))
    // .catch(err=>{console.log(err)
    // res.json({err:'please enter a uniqye value'})})
    
})
router.post('/login',[
    
    body('email','eneter valid email').isEmail(),
    body('password','passward must not be blank').exists(),

],async (req, res) => {

    
    const errors=  validationResult(req);
    let success =false;

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password} =req.body;
    try
    {
        let user=await User.findOne({email});
        // console.log(user)
        if(!user)
        {
            success=false
            return res.status(400).json({error:"soryy enetr right credenial"})
        }
        const passCompare =await bcrypt.compare(password,user.password)
        if(!passCompare)
        {
            success=false
            return res.status(400).json({success,error:"soryy enetr right credenial"})
        }
        const data={
            user:{
                id:user.id
            }
        }
        const authtoken =jwt.sign(data,JWT_SECRET)
        success =true;
        // res.send(success).send(authtoken);
        res.send(authtoken)

    }catch(error)
    {
        // console.err(err.message);
        res.status(500).send("what some error occured");
    }
}
)
router.post('/getuser',fetchuser, async (req, res) => {
    try {
        userId=req.user.id;
        const user =await User.findById(userId).select("-password")
        res.send(user);
    } catch (error) {
        res.status(500).send("what some error occured");   
    }
})

module.exports = router