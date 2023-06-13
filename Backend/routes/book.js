const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const multer = require('../middleware/multer-config');
const bookCtrl = require('../controllers/book');
const sharp = require('../middleware/sharp')

router.get('/', bookCtrl.getAllBooks);
router.post('/', auth, multer, sharp, bookCtrl.createBook);
router.get('/bestrating', bookCtrl.bestrating);
router.get('/:id', bookCtrl.getOneBook);
router.put('/:id', auth, multer, bookCtrl.modifyBook);
router.delete('/:id', auth, bookCtrl.deleteBook);

module.exports = router;