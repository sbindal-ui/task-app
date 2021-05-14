const express= require("express")
const router =new express.Router()
const auth= require("../middleware/auth")
const { rawListeners } = require("../models/tasks")
const Task=require("../models/tasks")

//---------- posting data----------------------
router.post("/tasks",auth,async(req,res)=>{
    //const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner:req.user._id})
    try{
await task.save()
res.status(201).send(task)
}
catch(e){
    res.status(400).send(e)
    }
}
)
//********login***************



// ------------- get data--------------------
// find all task of specific user
// router.get("/tasks",auth,async(req,res)=>{
//     try{
//        
//         const task=await Task.find({owner:req.user._id})
//         res.send(task)
//          }
//         catch(e){
//         res.status(400).send(e)
//         }
// }) 
//--------------or------------
//GET /tasks?completed=true
//GET /taks?limit=10&skip=20
//GET /taks?sortBy=createdAt:desc
router.get("/tasks",auth,async(req,res)=>{
    const match={}
    const sort={}
    if(req.query.completed){

        match.completed=req.query.completed==="true"
    }
    if(req.query.sortBy){

        const parts=req.query.sortBy.split(":")
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try{
        // console.log(match)
            await req.user.populate(
                {path:'tasks',match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
                }}).execPopulate()
        
    //     else{
    //         await req.user.populate('tasks').execPopulate()
    // }
        res.send(req.user.tasks)
         }
        catch(e){
        res.status(400).send(e)
        }
})
router.get('/tasks/:id',auth,async(req, res) => {
    // console.log("tasks api ")
   const _id = req.params.id // Access the id provided
   console.log(_id)
   try{
       //now we are finding only using task id and owner id should match
   const task = await Task.findOne({_id,owner:req.user._id})
//    console.log(task)
//    if (!task) {
//    return res.status(404).send()
//    }
   res.send(task)
}

   catch(e){
   res.status(500).send()
   } 
})
// router.get('/tasks/:id', async(req, res) => {
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


//--------------- patch-------------------------------


router.patch('/tasks/:id',auth, async (req, res) => {
    // Route handler code here
    const updates = Object.keys(req.body)
const allowedUpdates = ['completed', 'description']
const isValidOperation = updates.every((update) =>
allowedUpdates.includes(update))
if (!isValidOperation) {
 return res.status(400).send({ error: 'Invalid updates!' })
}
// console.log("shubham")
    
    try {
        const _id = req.params.id 
        const task = await Task.findOne({_id,owner:req.user._id})
        console.log(task)
      //  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new:
       //true, runValidators: true })
        if (!task) {
        return res.status(404).send()
        }
        updates.forEach((a)=>task[a]=req.body[a])
        await task.save()
        res.send(task)
       } catch (e) {
        res.status(400).send(e)
       }
})
// router.patch('/tasks/:id', async (req, res) => {
//     // Route handler code here
//     const updates = Object.keys(req.body)
// const allowedUpdates = ['completed', 'description']
// const isValidOperation = updates.every((update) =>
// allowedUpdates.includes(update))
// if (!isValidOperation) {
//  return res.status(400).send({ error: 'Invalid updates!' })
// }
    
//     try {
//         const task=await Task.findById(req.params.id)
//         console.log(task)
//         updates.forEach((a)=>task[a]=req.body[a])
//         await task.save()
//       //  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new:
//        //true, runValidators: true })
//         if (!task) {
//         return res.status(404).send()
//         }
//         res.send(task)
//        } catch (e) {
//         res.status(400).send(e)
//        }
// })

//----------delete--------
router.delete("/tasks/:id",auth,async(req,res)=>{
    try{ 
        const _id = req.params.id 
        const task = await Task.findOneAndDelete({_id,owner:req.user._id})
      if(!task)
     {
         return res.status(404).send()
     }  res.send(task)
       }  
  catch (e) {
  res.status(400).send(e)
 }
 })
module.exports=router
// router.delete("/tasks/:id",async(req,res)=>{
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