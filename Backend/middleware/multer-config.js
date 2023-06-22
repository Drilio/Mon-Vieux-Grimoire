const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        //récuperation du mimetype
        let mimetype = file.mimetype;
        console.log("multer")
        //récuperation de l'extension uniquement
        mimetype = mimetype.split('/')[1];
        path = require('path');
        //retrait des espaces
        let oldName = file.originalname.split(' ').join('_');
        //récupération du nom du fichier sans l'extension
        let onlyName = path.parse(oldName).name;
        //réatribution d'un nom unique avec un mimetype 
        callback(null, onlyName + Date.now() + '.' + mimetype);
    }
});

module.exports = multer({ storage }).single('image');