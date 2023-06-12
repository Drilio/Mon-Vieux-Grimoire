const jwt = require('jsonwebtoken');


//verification du token + transmition aux routes
module.exports = (req, res, next) => {
    try {
        console.log('test auth.js')
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next();
    } catch {
        (error) => res.status(401).json({ error });
    }
};