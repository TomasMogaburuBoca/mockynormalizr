const express = require ('express');
const path = require ('path');
const router = express.Router();

const {
    getProductsTest,
    getProducts,
    createProduct,
    getProductById,
    updateProductById,
    deleteProductById
} = require ('../controller/product.controller');

router.get('/products-test', getProductsTest);
router.get('/test', async (req, res) => {
    res.sendFile(path.join(__dirname + '/../public/products-test.html'));
});

router.post ('/products', createProduct);

router.get ('/products', getProducts);

router.get ('/products/:id', getProductById);

router.get ('/products/:id', updateProductById);

module.exports = router;