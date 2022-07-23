const express=require('express')
const connect=require("./config/db")
const {register ,login}=require("./controller/auth.controller")

const productController=require("./controller/product.controller")

const app=express()

app.use(express.json())

app.post("/register",register)
app.post("/login", login)

app.use("/product",productController)

app.listen(5000,async()=>{
 await connect()
console.log("app is running at port 5000");
})

