const express= require("express")
const app=express()
require("./db/mongoose")

// //FOR HEROHU   
// const port= process.env.PORT || 3000

//FOR HEROHU   using envcmd
const port= process.env.PORT 
//for converting json to object directly
app.use(express.json()) 
//using middleware
// const loggerMiddleware = (req, res, next) => {
//     console.log('New request to: ' + req.method + ' ' + req.path)
//     if(req.method==="GET")
//     {
//         res.send("getrequest disabled")
//     }
//     else{
//     next()
//    }
// }
// const loggerMiddleware = (req, res, next) => {
//         console.log('New request to: ' + req.method + ' ' + req.path)
//         res.status(501).send("in maintanaince mode")
    
//     }


   // Register the function as middleware for the application
// app.use(loggerMiddleware)
//using router
const userRouter= require('./routers/user')
app.use(userRouter)

const taskRouter= require('./routers/tasks')
app.use(taskRouter)
// "dev": "nodemon src/index.js"
// const multer = require('multer')
// // const upload = multer({
// //  dest: 'images'
// // })
// const upload = multer({
//     dest: 'images',
//     limits: {
//     fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(doc|docx)$/)) {
//     return cb(new Error('Please upload a Word document'))
//     }
//     cb(undefined, true)
//     }
//    })
// app.post("/upload", upload.single('image'), (req, res) => {
//     console.log("a")
//     res.send()
//    })

app.listen(port,()=>{
    console.log("servers is at port"+port)
})




//------------hashing-----------
// const bcrypt=require("bcryptjs")
// const hashf= async()=>{
//     const password = 'Red12345!'
// const hashedPassword = await bcrypt.hash(password, 8)
// console.log(password)
// console.log(hashedPassword)
// const isMatch = await bcrypt.compare('red12345!', hashedPassword)
// console.log(isMatch)
// }
// //hashf()




// //--------tokens----------
// const jwt = require('jsonwebtoken')
// const tokenf= async()=>{
// const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn:
// '7 days' })
// console.log("token"+token)
// const data = jwt.verify(token, 'thisismynewcourse')
// console.log(data)
// }
// tokenf()






//--------refernces-----
// const Task=require("./models/tasks")
// const User= require("./models/user")
// const main=async ()=>{
    //---------taks find user
//     const task = await Task.findById('6098dad846e6cc5c244f12dc')
// await task.populate('owner').execPopulate()
// console.log(task)
// console.log(task.owner)

//-----user find task
// const user = await User.findById('60910534c1a6042a6c1046a9')
// await user.populate('tasks').execPopulate()
// console.log(user.tasks)
// }
// main()
 










//const User= require("./models/user")
// const Task=require("./models/tasks")
// //---------- posting data----------------------

// app.post("/users",async(req,res)=>{
    
//     const user = new User(req.body)
//     try{
// await user.save()
// res.send(user)
// }
// catch(e){
//     res.status(400).send(e)
//     }
// })
// app.post("/tasks",async(req,res)=>{
//     const task = new Task(req.body)
//     try{
// await task.save()
// res.status(201).send(task)
// }
// catch(e){
//     res.status(400).send(e)
//     }
// }
// )

// // ------------- get data--------------------

// app.get("/users",async(req,res)=>{
//     try{
//     const user=await User.find({})
//     res.send(user)
//      }
//     catch(e){
//     res.status(400).send(e)
//     }
// })
// app.get('/users/:id', async(req, res) => {
//     const _id = req.params.id // Access the id provided
//     try{
//     const user = await User.findById(_id)
//     if (!user) {
//     return res.status(404).send()
//     }
//     res.send(user)
// }
//     catch(e){
//     res.status(500).send()
//     } 
// })
// app.get("/tasks",async(req,res)=>{
//     try{
//         const task=await Task.find({})
//         res.send(task)
//          }
//         catch(e){
//         res.status(400).send(e)
//         }
// })
// app.get('/tasks/:id', async(req, res) => {
//     console.log("tasks api ")
//    const _id = req.params.id // Access the id provided
//    console.log(_id)
//    try{
//    const task = await Task.findById(_id)
//    console.log(task)
//    if (!task) {
//    return res.status(404).send()
//    }
//    res.send(task)
// }

//    catch(e){
//    res.status(500).send()
//    } 
// })


// //--------------- patch-------------------------------

// app.patch('/users/:id', async (req, res) => {
//     // Route handler code here
//     const updates = Object.keys(req.body)
// const allowedUpdates = ['name', 'email', 'password', 'age']
// const isValidOperation = updates.every((update) =>
// allowedUpdates.includes(update))
// if (!isValidOperation) {
//  return res.status(400).send({ error: 'Invalid updates!' })
// }
    
//     try {
//         const user = await User.findByIdAndUpdate(req.params.id, req.body, { new:
//        true, runValidators: true })
//         if (!user) {
//         return res.status(404).send()
//         }
//         res.send(user)
//        } catch (e) {
//         res.status(400).send(e)
//        }
// })





// app.patch('/tasks/:id', async (req, res) => {
//     // Route handler code here
//     const updates = Object.keys(req.body)
// const allowedUpdates = ['completed', 'description']
// const isValidOperation = updates.every((update) =>
// allowedUpdates.includes(update))
// if (!isValidOperation) {
//  return res.status(400).send({ error: 'Invalid updates!' })
// }
    
//     try {
//         const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new:
//        true, runValidators: true })
//         if (!task) {
//         return res.status(404).send()
//         }
//         res.send(task)
//        } catch (e) {
//         res.status(400).send(e)
//        }
// })

// //----------delete--------
// app.delete("/users/:id",async(req,res)=>{
//    try{ 
//        console.log(req.params.id)
//        const user =await User.findByIdAndDelete(req.params.id)
//        console.log(user)
//      if(!user)
//     {
//         return res.status(404).send()
//     }  res.send(user)
//       }  
//  catch (e) {
//  res.status(400).send(e)
// }
// })
// app.delete("/tasks/:id",async(req,res)=>{
//     try{ 
//         console.log(req.params.id)
//         const task =await Task.findByIdAndDelete(req.params.id)
//         console.log(task)
//       if(!task)
//      {
//          return res.status(404).send()
//      }  res.send(task)
//        }  
//   catch (e) {
//   res.status(400).send(e)
//  }
//  })
// app.listen(port,()=>{
//     console.log("servers is at port"+port)
// })









// //without aync
// // app.post("/users",(req,res)=>{
// //     console.log(req.body)
// //     const user = new User(req.body)
// //     user.save().then(() => {
// //         res.status(201)
// //         res.send(user)
// //      }).catch((e) => {
// //     res.status(400).send(e)
// //     })
// // })
// // app.post("/tasks",(req,res)=>{
// //     console.log(req.body)
// //     const task = new Task(req.body)
// //     task.save().then(() => {
// //     res.status(201).send(task)
// //      }).catch((e) => {
// //     res.status(400).send(e)
// //     })
// // })

// // // to get data
// // app.get("/users",(req,res)=>{
// //     User.find({}).then((user) => {
// //     res.send(user)
// //      }).catch((e) => {
// //     res.status(400).send(e)
// //     })
// // })
// // app.get('/users/:id', (req, res) => {
// //     const _id = req.params.id // Access the id provided
// //     User.findById(_id).then((user) => {
// //     if (!user) {
// //     return res.status(404).send()
// //     }
// //     res.send(user)
// //     }).catch((e) => {
// //     res.status(500).send()
// //     })
// //    })
// // app.get("/tasks",(req,res)=>{
// //     Task.find({}).then((task) => {
// //     res.send(task)
// //      }).catch((e) => {
// //     res.status(400).send(e)
// //     })
// // })
// // app.get('/tasks/:id', (req, res) => {
// //     const _id = req.params.id // Access the id provided
// //     Task.findById(_id).then((task) => {
// //     if (!task) {
// //     return res.status(404).send()
// //     }
// //     res.send(task)
// //     }).catch((e) => {
// //     res.status(500).send()
// //     })
// //    })

