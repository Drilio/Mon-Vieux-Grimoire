const mongoose = require('mongoose')

//création du modèle de base de donnée
const bookSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    imageUrl: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    ratings: [
        {
            userId: String,
            grade: Number
        }],
    averageRating: {
        type: Number, default: function () {
            const myArray = this.ratings;
            let sum = 0;
            myArray.forEach(element => {
                sum += element.grade;
            });
            return sum / myArray.length || 0;
        }
    }
})

module.exports = mongoose.model('Book', bookSchema);