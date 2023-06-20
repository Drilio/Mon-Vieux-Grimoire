const sharp = require('sharp');

module.exports = (req, res, next) => {
    console.log(req.file.filename);
    try {
        console.log('Sharp test')
        let newFileName = req.file.filename;
        //splint au niveau du minetype
        let mimetype = req.file.mimetype;
        mimetype = mimetype.split('/')[1];
        console.log(mimetype);
        newFileName = newFileName.split(mimetype)[0] + Date.now();
        console.log(newFileName)
        //conditioner le passage dans sharp au fait que ce ne soit pas un fichier webp
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