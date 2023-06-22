const sharp = require('sharp');

module.exports = (req, res, next) => {
    console.log(req.file.filename);
    try {
        console.log('Sharp test')
        let newFileName = req.file.filename;
        //split au niveau du minetype
        let mimetype = req.file.mimetype;
        mimetype = mimetype.split('/')[1];
        //récupération du nom uniquement
        newFileName = path.parse(newFileName).name;
        console.log(newFileName)
        if (mimetype == "webp") {
            //retailler l'image
            sharp()
                .resize({
                    width: 500,
                    height: 500
                })
            next();
        } else {
            //retailler l'image + conversion en webp
            sharp(req.file.path)
                .webp({ quality: 80 })
                .resize({
                    width: 500,
                    height: 500
                })
                .toFile(`images/${newFileName}.webp`)
                .catch(error => {
                    res.status(400).json({ error });
                });

            next();
        }
        req.file = {
            filename: newFileName
        };
        //passer le nom via la req comme dans auth.js
    } catch {
        (error) => res.status(401).json({ error });
    }
};