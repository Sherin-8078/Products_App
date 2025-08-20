const express = require('express')
const router = express.Router()
const productModel = require('../Models/productData')
router.use(express.json())
router.use(express.urlencoded({ extended: true }));
const jwt = require('jsonwebtoken')

const verifyToken=(req,res,next)=>{
    let token = req.headers.token
    try{
        if(!token) throw "Unauthorised Access"
        let payload = jwt.verify(token,"secret")
        if(!payload) throw "Unauthorised Access"
        next()

    }catch(err){
        res.json({message:err})
    }
}

router.get('/',async(req,res)=>{
    try{
        const data = await productModel.find()
        res.status(200).send(data)
    }catch(error){
        console.error(error)
        res.status(500).send(' Data not found')
    }
})
router.post('/add',verifyToken,async(req,res)=>{
    try{
        const post = req.body
        const data = await productModel(post).save()
        res.status(200).send({ message:"product data added",products:data})
    }catch(error){
        console.error(error)
        res.status(500).send('Failed to add product data')
    }
})
router.put("/update/:id", verifyToken,async (req, res) => {
  try {
    const id = req.params.id;
    const updatedProduct = await productModel.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedProduct) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send({ message: "Product updated", data: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to update the product");
  }
});

router.delete('/delete/:id', verifyToken,async(req,res)=>{
    try{
        const id = req.params.id;
        await productModel.findByIdAndDelete(id);
        res.status(200).send({ message:"Product removed"})
    }catch(error){
        console.error(error)
        res.status(500).send('Failed to remove Product')
    }
})


module.exports = router