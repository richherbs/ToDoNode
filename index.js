const express = require('express')
const Mongo = require('mongodb')

const app = express()
const port = 3000
const Client = new Mongo.MongoClient('mongodb://localhost:27017', {useNewUrlParser: true})

app.use(express.json())

//ToDo
//get all ToDos
app.get('/ToDo', (req, res) => {
    Client.connect(async e=>{
        try{
        let db = await Client.db('Task')
        let collection = await db.collection('ToDo')
        let toDos = await collection.find().toArray()
        return res.status(200).json({
            success: true,
            message: 'successfully returned all ToDo',
            data: toDos
        })
        } catch {
            return res.status(500).json({
                success: false,
                message: 'unsuccessful at returning all ToDo',
            })
        }
    })
})

//create a ToDo
app.post('/ToDo', (req, res) => {
    Client.connect(async e=>{
        try{
            let db = await Client.db('Task')
            let collection = await db.collection('ToDo')
            let newToDoTitle = req.body.title

            let insert = await collection.insertOne({title: newToDoTitle, done: false})

            return res.status(200).json({
                success: true,
                message: 'successfully inserted',
                data: insert
            })
        }catch {
            return res.status(500).json({
            success: true,
            message: 'unsuccessful insert',
            data: insert})
        }
    })
})

//update a ToDo
app.put('/ToDo/:id', (req, res) => {
    Client.connect(async e=>{
        try{
            let db = await Client.db('Task')
            let collection = await db.collection('ToDo')
            let id = req.params.id
            let newTitle = req.body.newTitle

            let update = await collection.updateOne({_id: new Mongo.ObjectId(id)}, {$set: {title: newTitle}})

            return res.status(200).json({
                success: true,
                message: 'successfully updated',
                data: update
            })
        }catch {
            return res.status(500).json({
            success: true,  
            message: 'unsuccessful update',
            data: update})
        }
    })
})

//delete a ToDo
app.delete('/ToDo/:id', (req, res) => {
    Client.connect(async e=>{
        try{
            let db = await Client.db('Task')
            let collection = await db.collection('ToDo')
            let id = req.params.id

            let deleted = await collection.deleteOne({_id:new Mongo.ObjectId(id)})

            return res.status(200).json({
                success: true,
                message: 'successfully updated',
                data: deleted
            })
        } catch {
            return res.status(500).json({
                success: true,
                message: 'unsuccessful update'
            })
        }
    })
})

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))