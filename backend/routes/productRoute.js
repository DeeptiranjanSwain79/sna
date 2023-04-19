const express = require('express');
const { getAllProducts, createProduct } = require('../controllers/productControllers');
const router = express.Router();

//To get all products 
router.route('/product').get(getAllProducts);

//Creating a new producet
router.route('/product/new').post(createProduct);

module.exports = router;