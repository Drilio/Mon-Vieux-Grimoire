//import de express
const express = require('express');
//import de MongoDB
const mongoose = require('mongoose');

const bookRoutes = require('./routes/book');
const app = express();

mongoose.connect('mongodb+srv://antoineroy92:test123@clustervieuxgrimoire.wfdhr4u.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

//donne accès au corps de la requête en format json
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

app.use('/api/book', bookRoutes);


module.exports = app;