const mongoose=require("mongoose")
const bcryptjs =require ("bcryptjs")

const userSchema =new mongoose.Schema({
    name:{type:String, required:true,minLength: 8, maxLength: 20},
    email:{type:String, required:true,unique: true},
    password:{type:String, required:true,unique:true}
})


//  At the time of registration

userSchema.pre("save",function(next){
    if(!this.isModified("password")) return next()

    const hash=bcryptjs.hashSync(this.password, 8);
    this.password=hash
    next()

})


// At the time of Login

userSchema.methods.checkPassword = function(password) {
    const match = bcryptjs.compareSync(password, this.password);

    return match;
}


const user=mongoose.model("users",userSchema)

module.exports=user