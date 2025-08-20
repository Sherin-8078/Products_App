const express = require('express')
const router = express.Router()
const userModel = require('../Models/userData')
const jwt = require('jsonwebtoken')
const userData = require('../Models/userData')

router.use(express.json())
router.use(express.urlencoded({ extended: true }));

router.get('/',async(req,res)=>{
    try{
        const data = await userModel.find()
        res.status(200).send(data)
    }catch(error){
        console.error(error)
        res.status(500).send(' Data not found')
    }
})
router.post('/add',async(req,res)=>{
    try{
        const user = req.body
        const data = await userModel(user).save()
        res.status(200).send({message:"user added ",users:data})
    }catch(error){
        console.error(error)
        res.status(500).send('Failed to add user')
    }
})
router.post("/login", async (req, res) => {
    const user = await userData.findOne({email:req.body.email})
    if(!user){
        return res.sendStatus(404).send({message:"User not found"})
    }
    try {
        if(user.password==req.body.password){
        const payload = {name:req.body.name,password:req.body.password}
        const token = jwt.sign(payload,"secret")
        res.status(200).send({message:"Login Succesfull",userToken:token})

    }
    else{
        res.status(401).send({message:"Invalid credentials!"})
    }

        
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error in server" });
    }
});




module.exports = router