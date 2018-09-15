var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/puppies');
//db.dropDatabase()

var ToDoSchema = new mongoose.Schema({
    name:String,
    completed:Boolean
});

var Todo = mongoose.model('todos',ToDoSchema); // getter and setter method
Todo.create({
    name : 'Apply for new jobs tomorrow!',
    completed : false
}).then(function(err,todo){
    console.log(err,todo);
});

var UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    gender:String,
    Born:Date,
    age:{
        type:Number,
        min:0,
        max:90
    },
    hobbies:[],
    code:Buffer,
    location:{
        state:String,
        city:String,
        zip:Number
    },
    Parent:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Owner'
    }
});
