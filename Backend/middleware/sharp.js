const sharp = require('sharp');

module.exports = (req, res, next) => {
    console.log(req.file.filename)
    try {
        console.log('Sharp test')
        let newFileName = req.file.filename;
        newFileName = newFileName.split('.')[0];
        console.log(newFileName)
        sharp(req.file.path)
            .webp({ quality: 80 })
            .toFile(`images/${newFileName}.webp`)
            .catch(error => {
                res.status(400).json({ error });
            });
        next();
    } catch {
        (error) => res.status(401).json({ error });
    }
};