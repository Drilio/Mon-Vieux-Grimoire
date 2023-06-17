const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        let mimetype = file.mimetype;
        console.log("multer")
        mimetype = mimetype.split('/')[1];
        let name = file.originalname.split(' ').join('_');
        name = name.split(`.${mimetype}`)[0];
        console.log(name);
        callback(null, name + Date.now() + '.' + mimetype);
    }
});

module.exports = multer({ storage }).single('image');