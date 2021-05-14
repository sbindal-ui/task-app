const mongoose = require("mongoose")
const bcrypt= require("bcryptjs")
const validator = require('validator')
const  jwt = require("jsonwebtoken")
//using monngoose schema for password bcrypt
const userSchema=new mongoose.Schema( {
    name: {
    type: String,
    required: true,
    trim: true
    },
    email: {
    type: String,
    unique:true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
    if (!validator.isEmail(value)) {
    throw new Error('Email is invalid')
    }
    }
    },
    age: {
       type: Number,
       default:0,
       validate(value) {
           if(value<0){
               throw new Error('age must be positive')
   
           }
    }
    
   
   
   
    },
    password:{
       type: String,
       required: true,
       trim: true,
       minlength:7,
       validate(value) {     
        if(value.toLowerCase().includes("password")){
            throw new Error("password cannot contain passwprd")
        }  
       }
   },
   tokens: [{
    token: {
    type: String,
    required: true
    }
    }],
    avatar:{
        type:Buffer,
    },
},{
    timestamps:true
})
// for timestamps second feild added
//----------for refrences-------------
userSchema.virtual('tasks',{
    ref: 'Task',
    localField:"_id",
    foreignField: 'owner'
   })
//-------login-------
userSchema.statics.findByCredentials= async(email,password)=>{
    // console.log("fbc works")
    const user = await User.findOne({ email })
    // console.log(user)
 if (!user) {
 throw new Error('Unable to login')
 }
 const isMatch = await bcrypt.compare(password, user.password)
//  console.log(isMatch)
 if (!isMatch) {
 throw new Error('Unable to login')
 }
 return user
} 
//----------hashing password----------
userSchema.pre("save",async function(next){
    // console.log("works")
    const user = this
    // console.log(user)
 if (user.isModified('password')) {
    //  console.log("inside")
 user.password = await bcrypt.hash(user.password, 8)
 }
 next()
})
//---------delte task if user delete
const Task = require('./tasks')
userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
   })
//----tokens--------
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')
    user.tokens = user.tokens.concat({ token })
 await user.save()
return token
}
//------------to hide data----------------

// userSchema.methods.getpublicprofile= function () {
userSchema.methods.toJSON= function () {
    const user = this
 const userObject = user.toObject()
 delete userObject.password
 delete userObject.tokens
 delete userObject.avatar
 return userObject
}
const User = mongoose.model('User',userSchema)
module.exports = User
// const mongoose = require("mongoose")

// const validator = require('validator')

// const User = mongoose.model('User', {
//  name: {
//  type: String,
//  required: true,
//  trim: true
//  },
//  email: {
//  type: String,
//  required: true,
//  trim: true,
//  lowercase: true,
//  validate(value) {
//  if (!validator.isEmail(value)) {
//  throw new Error('Email is invalid')
//  }
//  }
//  },
//  age: {
//     type: Number,
//     default:0,
//     validate(value) {
//         if(value<0){
//             throw new Error('age must be positive')

//         }
//  }
 



//  },
//  password:{
//     type: String,
//     required: true,
//     trim: true,
//     minlength:7,
//     validate(value) {     
//      if(value.toLowerCase().includes("password")){
//          throw new Error("password cannot contain passwprd")
//      }  
//     }
// },}
// )
// module.exports = User








