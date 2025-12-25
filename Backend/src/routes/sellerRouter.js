const express = require('express');
const sellerRouter = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const addBook  = require('../controllers/addBook');
const { updateBook } = require('../controllers/updateBook');
const { mybookssold } = require('../controllers/mybookssold');
const { deleteBook } = require('../controllers/deleteBook'); // Assuming deleteBook is defined in controllers
const  getAllBooks  = require('../controllers/getAllBooks');
const upload = require('../../middleware/multer');


sellerRouter.get('/books', getAllBooks);
sellerRouter.post('/books/add',authMiddleware(['seller']),upload.single('image'),addBook);
sellerRouter.put('/books/:id', authMiddleware(['seller']), upload.single('image'),updateBook);
sellerRouter.get('/books/mybooks',authMiddleware(['seller']),mybookssold);
sellerRouter.delete('/books/:id', authMiddleware(['seller']), deleteBook); // Assuming deleteBook is defined in controllers
module.exports = sellerRouter;