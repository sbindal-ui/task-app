const express= require("express")
const { findById, updateMany } = require("../models/user")
const User= require("../models/user")
const auth= require("../middleware/auth")
const sharp = require('sharp')
const router =new express.Router()

//---------- posting data----------------------

router.post("/users",async(req,res)=>{
    
    const user = new User(req.body)
    try{
await user.save()
const token = await user.generateAuthToken()
res.send({user,token})
}
catch(e){
    res.status(400).send(e)
    }
})
//********login***************
router.post("/users/login",async(req,res)=>{
    try{
        // console.log("login")
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        // res.send({"user":user.getpublicprofile(),token})
        res.send({user,token})
    }
catch(e){
    res.status(400).send("please authenticate")
    }
})
//*******logout*****************
router.post("/users/logout",auth,async(req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((toke)=>{
            return toke.token !==req.token
        })
        await req.user.save()
        res.send()
    }
catch(e){
    res.status(500).send(e)
    }
})
router.post("/users/logoutAll",auth,async(req,res)=>{
    try{
        req.user.tokens=[]
        
        await req.user.save()
        res.send()
    }
catch(e){
    res.status(500).send(e)
    }
})
// ------------- get data--------------------
router.get("/users/me",auth,async(req,res)=>{
        res.send(req.user)
    })
// router.get("/users",auth,async(req,res)=>{
//     try{
//     const user=await User.find({})
//     res.send(user)
//      }
//     catch(e){
//     res.status(400).send(e)
//     }
// })
//------------no need to do this-----------
// router.get('/users/:id', async(req, res) => {
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

//--------------- patch-------------------------------


router.patch('/users/me',auth,async (req, res) => {
    // Route handler code here
    const updates = Object.keys(req.body)
const allowedUpdates = ['name', 'email', 'password', 'age']
const isValidOperation = updates.every((update) =>
allowedUpdates.includes(update))
if (!isValidOperation) {
 return res.status(400).send({ error: 'Invalid updates!' })
}
    
    try {
        updates.forEach((a)=>{
            req.user[a]=req.body[a]
        })
        // console.log("------------"+req.user)
        await req.user.save()
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new:
    //    true, runValidators: true })
        res.send(req.user)
       } catch (e) {
        res.status(400).send(e)
       }
})

// router.patch('/users/:id', async (req, res) => {
//     // Route handler code here
//     const updates = Object.keys(req.body)
// const allowedUpdates = ['name', 'email', 'password', 'age']
// const isValidOperation = updates.every((update) =>
// allowedUpdates.includes(update))
// if (!isValidOperation) {
//  return res.status(400).send({ error: 'Invalid updates!' })
// }
    
//     try {
//         const user=await User.findById(req.params.id)
        // console.log(user)
//         updates.forEach((a)=>{
//             user[a]=req.body[a]
//         })
//         await user.save()
//         // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new:
//     //    true, runValidators: true })
//         if (!user) {
//         return res.status(404).send()
//         }
//         res.send(user)
//        } catch (e) {
//         res.status(400).send(e)
//        }
// })




//----------delete--------
// router.delete("/users/:id",async(req,res)=>{
// //     try{ 
//         console.log(req.params.id)
//         const user =await User.findByIdAndDelete(req.params.id)
        // console.log(user)
//       if(!user)
//      {
//          return res.status(404).send()
//      }  res.send(user)
//        }  
//   catch (e) {
//   res.status(400).send(e)
//  }
//  })
// now we want to only to delte self
router.delete("/users/me",auth,async(req,res)=>{
   try{ 
       console.log(req.user._id)
    //    const user =await User.findByIdAndDelete(req.user._id)
    //     res.send(user)
    await req.user.remove()
    res.status(200).send(req.user)
      }  
 catch (e) {
 res.status(400).send(e)
}
})


//----------upload--------------
const multer = require('multer')
// const upload = multer({
//  dest: 'avatars'
// })
const upload = multer({
    //as we only want data to be saved on user profile
//  dest: 'avatars',
 limits: {
 fileSize: 1000000
 },
 fileFilter(req, file, cb) {
 if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
 return cb(new Error('Please upload a image'))
 }
 cb(undefined, true)
 }
})
// router.post("/users/me/avatar", upload.single('avatar'), (req, res) => {
//     console.log("a")
//     res.send()
//    },(error, req, res, next) => {
//     res.status(400).send({ error: error.message })
//    })
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req,
    res) => {
      
const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250
}).png().toBuffer()
    //  req.user.avatar = req.file.buffer
    req.user.avatar=buffer
     await req.user.save()
     res.send()
    }, (error, req, res, next) => {
     res.status(400).send({ error: error.message })
    })
router.delete("/users/me/avatar",auth,async(req,res)=>{
        try{ 
            console.log(req.user._id)
         //    const user =await User.findByIdAndDelete(req.user._id)
         //     res.send(user)
         req.user.avatar=undefined
         await req.user.save()
         res.status(200).send(req.user)
           }  
      catch (e) {
      res.status(400).send(e)
     }
     })
router.get('/users/:id/avatar', async (req, res) => {
        try {
        const user = await User.findById(req.params.id)
        if (!user || !user.avatar) {
        throw new Error()
        }
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
        } catch (e) {
        res.status(404).send()
        }
       })

module.exports = router