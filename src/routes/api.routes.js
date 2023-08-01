const express = require('express');
const router = express.Router();
const controller = require('../controller/api.controller');

router.get('/api/books', controller.getAllBooks);
router.get('/api/books/:saga', controller.getBooksBySaga);
router.get('/api/buy', controller.getAllBuyUrl);
router.get('/api/buy/:isbn', controller.getUrlByIsbn);
router.post('/api/books', controller.postBook);
router.post('/api/buy', controller.postUrlBuy);

module.exports = router;
