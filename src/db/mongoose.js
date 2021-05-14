const mongoose = require("mongoose")

// const validator = require('validator')
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
})
// const User =mongoose.model("User",{
//     name: {
//         type: String
//         },
//         age: {
//         type: Number
//         }
//        })
    
//     const me= new User({
//         name:"shubham",
//         age:20
//     })
//     me.save().then(()=>{
//         console.log(me)
//     }).catch((error)=>{
//         console.log(error)
//     })
// const Task =mongoose.model("Task",{
//     description: {
//         type: String,
//         required:true,
//         trim:true,
//         },
//         compeleted: {
//         type: Boolean,
//         default:false
//         }

//        })
    
//     const task= new Task({
//         description: 'learning mongoose',
//     })
//     task.save().then(()=>{
//         console.log(task)
//     }).catch((error)=>{
//         console.log(error)
//     })

// validation

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
// // const me= new User({
// //             name:"shubhambindal",
// //             email:"shubhambinndl8@gmail.com",
// // this also valid only those thing enter where model fiels were there
// //             emails:"shubhambndl88@gmail.com"
// //         })
// const me= new User({
//             name:"shubhambindal",
//             email:"shubhambinndl8@gmail.com",
//             age :20,
//             password:"shubhamishacker"
//         })

//         me.save().then(()=>{
//             console.log(me)
//         }).catch((error)=>{
//             console.log(error)
//         })



    // const task= new Task({
    //     description: 'learning mongoose',
    //    completed: false
    // })
    // task.save().then(()=>{
    //     console.log(task)
    // }).catch((error)=>{
    //     console.log(error)
    // })



    
    //.\/"Program Files"/MongoDB/Server/4.4/bin/mongod.exe --dbpath=D:/mongodata