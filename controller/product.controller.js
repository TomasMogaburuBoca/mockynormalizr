const ProductModel = require ('../models/product.model');
const Producto = new ProductModel();
const faker = require ('@faker-js/faker').faker;

faker.locale= 'es';
const { commerce, image } = faker;

module.exports = {
    getProductsTest: async (req, res) =>{
        const products = [];
        try{
            for (let i = 0; i < 5; i++){
            const product = {
                name :commerce.product(),
                price: commerce.price(),
                url : image.technics(100, 100, true),
            };
            products.push(product);
        }
        res.status(200).send({
            status: 200,
            data: products,
            message: 'products was obtained successfully'
        });
    } catch (error) {
        res.status(500).send({
            status: 500,
            messages: error.message
        })
    }
},

    createProduct: async (req, res) =>{
        try{
            const id = await Producto.save (req.body);
            res.status(200).send({
                status: 200,
                data: { id },
                message: 'Product was added successfully'
            })
        } catch (error){
            res.status (500).send({
                status: 500,
                messages: error.message
            });
        }
    },

    getProducts : async (req, res) =>{
        try{
            const data = await Producto.getAll();
            res.render ('products', {
                    name: 'products',
                    products: data
            });
        }catch (error){
            res.status(500).send ({
                status: 500,
                messages: error.message
            });
        }
    },

    getProductsById: async (req,res) =>{
        const idProduct = req.params.id;
        try{
            const data = await Producto.getById(idProduct);
            res.status(200).send({
                status: 200,
                data,
                message: 'Products was obtained successfully'
            })
        } catch (error) {
            res.status (500).send({
                status: 500,
                message: error.message,
            })
        }
    },

    updateProductById: async (req, res) =>{
        const idProduct = req.params.id;
        const product = req.body;
        try{
            const data = await ProductModel.updateById (idProduct, product);
            res.status(200).send({
                status: 200,
                data,
                message: 'Product was updated successfully'
            });
        }catch (error){
            res.status(500).send({
                status: 500,
                messages: error.message
            });
        }
    },

    deleteProductById: async (req, res) =>{
        const idProduct = req. params.id;
        try{
            const data = await Producto.deleteById (idProduct);
            res.status(200).send({
                status: 200,
                data: { id: idProduct },
                message: 'Product was deleted successfully'
            })
        }catch (error){
            res.status(500).send({
                status: 500,
                message: error.message
            });
        }
    },
};