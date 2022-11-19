const { Knex } = require('knex');
const { config } = require ('./config');
const knex = require ('knex') (config);
const { products } = require ('./products');

const seedDatabaseProductsMySQL = async () =>{
    try {
        console.log('MySQL');
    const existTableProducts = await knex.schema.hasTable ('PRODUCTS');
    if (existTableProducts){
        await knex.schema.dropTable('PRODUCTS');
    }
    await knex.schema.dropTable('PRODUCTS', (table) =>{
        table.string( 'id', 40).primary();
        table.string ('name', 20).nullable(false);
        table.float('price').nullable(false);
    });
    await knex('PRODUCTS').insert(products);
    awair.knex.destroy();
    } catch (error){console.log(error.message);}
};

seedDatabaseProductsMySQL();