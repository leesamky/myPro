var mongoose=require('mongoose')
var Schema=mongoose.Schema

mongoose.connect('mongodb://localhost/todos')

var todoSchema=new Schema({
    task:String,
    isCompleted:Boolean,
    isEditing:Boolean
})

module.exports=mongoose.model('Todo',todoSchema)