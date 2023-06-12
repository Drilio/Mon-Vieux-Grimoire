const sharp = require('sharp');

module.exports = (req, res, next) => {
    console.log(req.file.filename)
    try {
        // const newFileName = req.file.filename manipuler avec le split pour virer le jpg 
        sharp(req.file.path)
            .webp({ quality: 80 })
            .toFile(`images/${req.file.filename}.webp`)
            // virer l'injection req.file.filename par newFileName
            .catch(error => {
                res.status(400).json({ error });
            });
        next();
    } catch {
        (error) => res.status(401).json({ error });
    }
};