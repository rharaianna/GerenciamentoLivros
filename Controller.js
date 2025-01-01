const express = require ('express');
const cors = require ('cors');
const bodyParser = require('body-parser');
const {Book} = require('./models');

const app=express();
app.use(cors());
app.use(bodyParser.json());


//Ve se ta rodando
app.get('/',(req,res)=>{
    res.send('rodandoooooooo');
});

//Cria livro
app.post('/books',async(req,res)=>{
    console.log("Dados recebidos:", req.body); // Verificando se os dados estão chegando
    try {
        const {title, author, desc} = req.body;
        const book = await Book.create({title,author,desc});
        res.status(201).json(book);
    } catch (error) {
        console.error("Erro ao criar livro:", error);
    }
});

//Vizualiza todos os livros
app.get('/books',async(req,res)=>{
    try{
        const books = await Book.findAll();
        res.json(books);
    }
    catch (error){
        console.log("Vizualizar varios nn funciona")
        //Aqui
        res.status(500).json({ error: 'Erro ao buscar livros.' });
    }
});

//Vizualiza um livro
app.get('/books/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const books = await Book.findByPk(id);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ error: 'Livro não encontrado.' });
        }
    }
    catch (error){
        console.log("Erro ao buscar livro:", error);
        res.status(500).json({ error: 'Erro ao buscar livro.' });
    }
});


//Atualiza livro
app.put('/books/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const { title, author, desc } = req.body;
        const book = await Book.findByPk(id);

        if(book){
            await book.update({title, author, desc});
            res.json(book);
            console.log("livro atualizado");
        }
        else{
            console.log("livro nn encontrado");
        }
    }
    catch(error){
        console.log("Atualizar nn funciona");
    }
});

app.delete('/books/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        console.log(`ID recebido: ${id}`);
        const book = await Book.findByPk(id);

        if(book){
            await book.destroy();
            res.status(200).send({ message: 'Livro excluído com sucesso' });
        }
        else{
            res.status(404).send({ message: 'Livro não encontrado' });
        }
    }
    catch (error){
        console.log("Excluir nn funciona");
        res.status(500).send({ message: 'Erro no servidor' });
    }
});

let port=process.env.PORT || 3000;
app.listen(port,(req,res)=>{
    console.log('servidor rodando');
});