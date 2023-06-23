const sharp = require('sharp');
const fs = require("fs");
const path = require("path");

module.exports = (req, res, next) => {
    try {
        let filePathObject = path.parse(req.file.filename);

        if (filePathObject.ext == ".webp") {
            //retailler l'image
            sharp()
                .resize({
                    width: 500,
                })
            next();
        } else {
            let newPath = `images/${filePathObject.name}.webp`;
            let newFileName = `${filePathObject.name}.webp`

            //retailler l'image + conversion en webp
            sharp(req.file.path)
                .webp({ quality: 80 })
                .resize({
                    width: 500,
                })
                .toFile(newPath, function () {
                    fs.unlinkSync(`./images/${req.file.filename}`);
                    req.file = {
                        filename: newFileName
                    };
                    next();
                })
                .catch(error => {
                    res.status(400).json({ error });
                });
        }
    } catch {
        (error) => res.status(401).json({ error });
    }
};