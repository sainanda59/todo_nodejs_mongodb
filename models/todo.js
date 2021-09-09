const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task :{
        type:String,
        required:true
    },
    category :{
        type:String,
        required:true
    },
    deadline :{
        type:String,
        require:true
    }
});

const Todos = mongoose.model('Todos',todoSchema);

module.exports = Todos;