const express = require('express');

const app = express();

//donne accès au corps de la requête en format json
app.use(express.json());

//Accède aux données data.json qui contient les livres
const books = require('../Frontend/public/data/data.json')


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

app.post('/api/Ajouter', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'Objet créé, enfin non mais oui'
    });
})


app.get('/api/books', (req, res, next) => {
    books;
    res.status(200).json(books);
    next();
});

module.exports = app;