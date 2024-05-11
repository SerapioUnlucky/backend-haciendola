const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const check = require('../middlewares/auth');

router.get('/view/all', check.auth, productController.viewAll);
router.post('/create', check.auth, productController.create);
router.put('/update/:id', check.auth, productController.update);
router.delete('/delete/:id', check.auth, productController.deleted);

module.exports = router;
