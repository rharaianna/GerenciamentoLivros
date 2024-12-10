const express = require ('express');
const cors = require ('cors');
const bodyParser = require('body-parser');
const models=require('./models');
const { where } = require('sequelize');

const app=express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


let book = models.Book



// app.post('/input', async(req,res)=>{
//     let response = await book.findOne({
//         where:{title: req.body.title, author:req.body.author, desc:req.body.desc}
//     });
//     console.log(response);
// })

app.get('/',(req,res)=>{
    res.send('rodandoooooooo');
});

app.post('/create',async(req,res)=>{
    console.log("Dados recebidos:", req.body); // Verificando se os dados estão chegando
    try {
        const create = await book.create({
            title: req.body.title,
            author: req.body.author,
            desc: req.body.desc,
            createdAt: new Date(),
            UpdatedAt: new Date(),
        });
        console.log("Livro criado:", create); // Verificando a criação do livro
        res.json({ message: 'Livro criado com sucesso!', data: create });
    } catch (error) {
        console.error("Erro ao criar livro:", error);
    }
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