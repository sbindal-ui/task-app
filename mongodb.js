// crud operations
// const md= require("mongodb")
// const MongoClient =md.MongoClient
// const objectID =md.MobjectID

//destructuring
const {MongoClient,ObjectID, Db}= require("mongodb")

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'
// const id =new ObjectID()
// console.log(id)
// console.log(id.getTimestamp())
MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client) => {
    if(error){
        return console.log("unable to connect to database")
    }
    // console.log("connected successfully")
     const db= client.db(databaseName)
    
     //------------insert-----------

    //  db.collection('users').insertOne({
    //      _id:id,
    //     name: 'vikram',
    //     age: 26
    //    },(error,result)=>{
    //        if(error){
    //            return console.log("unable to insert one user")
    //        }
    //        console.log(result.ops)
    //    })
      
    //    db.collection('users').insertOne({
    //     name: 'vikram',
    //     age: 26
    //    })
    //    db.collection('tasks').insertMany([
    //     {
    //     description: 'Clean the house',
    //     completed: true
    //     },{
    //     description: 'Renew inspection',
    //     completed: false
    //     }
    //    ], (error, result) => {
    //     if (error) {
    //     return console.log('Unable to insert tasks!')
    //     }
    //     console.log(result.ops)
    //    })
      
    // --------READ--------------

    // db.collection("tasks").find({completed:false}).toArray(
    //     (error,tasks)=>{
    //         console.log(tasks)
    //     }
    // )
    // db.collection("users").find({name:"shubham"}).toArray(
    //     (error,tasks)=>{
    //         console.log(tasks)
    //     }
    // )
    // db.collection("users").findOne({name:"shubham"},(
    //     (error,tasks)=>{
    //         console.log(tasks)
    //     }
    // ) )

    //----------- update-----------------

    // db.collection("users").updateOne({
    //     _id: new ObjectID("6089832ec6c21b2e989b3095")
    // },{
    //     $set:{
    //         name:"sheldon"
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)

    // })
    // db.collection("tasks").updateMany({
    //     completed:false
    // },{
    //     $set:{
    //         completed:true
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)

    // })

    //-------delete-------------
    
    // db.collection('users').deleteMany({
    //     age: 27
    //    }).then((result) => {
    //     console.log(result)
    //    }).catch((error) => {
    //     console.log(error)
    //    })
    //    db.collection('tasks').deleteOne({
    //     description: "Clean the house"
    //    }).then((result) => {
    //     console.log(result)
    //    }).catch((error) => {
    //     console.log(error)
    //    })




       //.\/"Program Files"/MongoDB/Server/4.4/bin/mongod.exe --dbpath=D:/mongodata
})