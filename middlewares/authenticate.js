const { verify } = require("jsonwebtoken");
const jwt=require("jsonwebtoken")
require("dotenv").config()

function verifyToken(token){
    return new Promise(function (resolve,reject){

        jwt.verify(token,process.env.JWT_SECRET_KEY,function(err,res){

            if(err) return reject(err)

            return resolve(res)
        })
    })
}


function authenticate(req,res,next){

    // if we have received the bearer token in the header

    const bearerToken=req.headers.authorization;

     // if not we will throw an error

     if(!bearerToken || bearerToken.startsWith('Bearer ')){
      return  res.status(400).send({message:"Please provide the proper bearer token"})
     }

    //else we will extract an user  from the token

    const token=bearerToken.split(" ")[1]

    // if user not found throw an error

  try{
    const {user}=verifyToken(token)

    console.log("user at authenticate file:",user);

    // else we will attach the user with the request 
    req.user=user

    //return next
    

    return next();
  }
  catch(err){
 return res.status(400).send({message: "calling the error from authenticate file so please provide the valid bearer token"})
  }

}

module.exports=authenticate