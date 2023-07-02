const Book = require('../models/book');
const fs = require('fs');

exports.createBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;
    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    book.save()
        .then(() => {
            res.status(201).json({ message: 'Object enregistré !' });
        })
        .catch(error => {
            res.status(400).json({ error });
        });
}

exports.modifyBook = (req, res, next) => {
    const bookObject = req.file ? {
        ...JSON.parse(req, body.book),
        imageUrl: `${req.body}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete bookObject._userId;
    Book.findOne({ _id: req.params.id })
        .then((book) => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non-Auorisé' });
            } else {
                Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        })
}

exports.deleteBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then(book => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non-autorisé' });
            } else {
                const filename = book.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Book.deleteOne({ _id: req.params.id })
                        .then(res.status(200).json({ message: 'Objet supprimé !' }))
                        .catch(error => res.status(401).json({ error }));
                })
            }
        })
        .catch(error => {
            res.status(500).json({ error })
        });
}

exports.getAllBooks = (req, res, next) => {
    console.log('testgetAllBooks')
    Book.find()
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }))
}

exports.getOneBook = (req, res, next) => {
    console.log('testOneBook')
    console.log(req.params.id);
    Book.findOne({ _id: req.params.id })
        .then(book => res.status(200).json(book))
        .catch(error => res.status(404).json({ error }));
}

exports.bestrating = (req, res, next) => {
    console.log("bestrating");
    Book.find()
        .then((books) => {
            const sortedBooks = books.sort((a, b) => b.averageRating - a.averageRating)
            const topBooks = sortedBooks.slice(0, 3);
            return topBooks;
        })
        .then(topBooks => res.status(200).json(topBooks))
        .catch(error => res.status(400).json({ error }))
}

exports.rating = (req, res) => {
    Book.findOne({ _id: req.params.id })
        .then(book => {

            const newRating =
            {
                grade: parseInt(req.body.rating),
                userId: req.body.userId
            };
            book.ratings.push(newRating);
            return book.save()
        })
        .then(book => {

            const calculateAverage = () => {
                const myArray = book.ratings;
                let sum = 0;
                myArray.forEach(element => {
                    sum += element.grade;
                });
                return Math.round(sum / myArray.length) || 0;
            }

            const newAverageRating = calculateAverage();

            book.averageRating = parseInt(newAverageRating);

            console.log(book)

            return book.save()
        })
        .then(updateBook => {
            console.log("New rating added :", updateBook);
            res.json(updateBook);
        })
        .catch(error => res.status(400).json({ error }))

}