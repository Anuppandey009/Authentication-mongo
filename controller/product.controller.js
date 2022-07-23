const express=require("express")

const router=express.Router()

const Products=require('../model/product.model')

const authenticate=require("../middlewares/authenticate")

router.get("/",authenticate, async function (req,res) {

    
    const products=await Products.find().lean().exec();
    console.log("products",products);

    return res.send(products)
})

module.exports=router
