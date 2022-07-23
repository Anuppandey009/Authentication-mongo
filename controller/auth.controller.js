
const Users= require("../model/user.model")
const jwt =require("jsonwebtoken")
 require("dotenv").config();


const newToken=(user)=>{
    return jwt.sign({user},process.env.JWT_SECRET_KEY)
}


const register=async(req,res)=>{

 let user

    try{
 
        user = await Users.findOne({name: req.body.name})

        console.log({user});


    
   user=await Users.findOne({name:req.body.email})

   if(user) return res.status(400).send({message: "email already exist"})

   user=await Users.create(req.body)

    const token=newToken(user)
     console.log(token);
    return res.status(200).send({user,token})
    }
    catch(err){
        console.log("err",err)
        
        res.status(500).send({message:"Sorry for the data base inconvenince"})
    }

}



const login = async (req,res)=>{
    let user;
    try{
        user=await Users.findOne({name:req.body.email})
        console.log("user12345",user);

        if(!user)  return res.status(400).send({message:"please check the email and passworddddd"})


        let match=user.checkPassword(req.body.password)
        
        

        if(!match) return res.status(400).send({message:"please check ur email and password"})

        const token =newToken(user)
        return res.status(200).send({user, token})
    }
    catch(err){

        return res.status(500).send({message:"sorry for inconveniene please try again"})
    }
}






module.exports={register,login}