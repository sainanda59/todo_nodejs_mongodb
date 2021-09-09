const express = require('express');
const path = require('path')
const port = 8000;

const db = require('./config/mongoose');
const Todos = require('./models/todo');
const app = express();

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));

app.use(express.urlencoded());
app.use(express.static('assests'));

app.get('/',function(req,res){

    Todos.find().sort('deadline').exec(function(err,todos){
         if(err){
             console.log('error in fetching task!');
             return;
         }
    
     return res.render('home',{
         todo_list : todos
     });

    });
});



app.post('/create-task',function(req,res){
    console.log(req.body);
    Todos.create({
        task: req.body.task,
        category: req.body.category,
        deadline: req.body.deadline

    },function(err,newTask){
        if(err){
            console.log(err);
            return;
        }

        console.log('**********', newTask);
        return res.redirect('/');
    });

});

app.get('/delete-task/', function(req,res){
        console.log(req.query);
        let id = req.query.id;

        Todos.findByIdAndDelete(id,function(err){
            if(err){
                console.log('error in deleting task from database!');
                return;
            }
            return res.redirect('/');
        });
        
});

app.listen(port, function(err){
    if(err){
        console.log('error ',err);
    }
    console.log('Express Server is running on port:',port);
});