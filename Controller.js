const express = require ('express');
const cors = require ('cors');
const bodyParser = require('body-parser');
const models=require('./models')

const app=express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));


let book = models.Book

app.get('/',(req,res)=>{
    res.send('rodandoooooooo');
});

app.get('/create',async(req,res)=>{
    let create = await book.create({
        title:'titulo2',
        author:'autor2',
        desc:'desc2',
        createdAt:new Date(),
        UpdatedAt: new Date(),
    })
    res.send("livro criado")
});

app.get('/read',async(req,res)=>{
    let read= await book.findAll({
        raw:true
    });
    console.log(read);
});

app.get('/update',async(req,res)=>{
    let update= await book.findByPk(1).then((response)=>{
        response.title = 'titulo1Editado';
        response.save();
    });
});

app.get('/delete',async(req,res)=>{
    book.destroy({
        where:{id:2}
    })
});

let port=process.env.PORT || 3000;
app.listen(port,(req,res)=>{
    console.log('servidor rodando');
});