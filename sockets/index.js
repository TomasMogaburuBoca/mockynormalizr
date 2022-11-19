const ProductModel = require ('../models/product.model');
const Product = new ProductModel();
const ChatModel = require ('../models/chat.models');
const Chat = new ChatModel();

module.exports = (io) =>{
    io.on ('connection', (socket) =>{
        console.log('Client Connected', socket.id);

        const sendProductsTets = async () =>{
            const products = await Product.getAllProductsTest();
            io.emit ('server: sendProductsTest', products);
        };
        sendProductsTets();

        const sendProducts = async ()=>{
            const products = await Product.getAll();
            io.emit ('server: sendProducts', products);
        };
        sendProducts();

        socket.on ('client: newProduct', async (data) =>{
            await Product.save(data);
            sendProducts();
        });

        const sendMessages = async () =>{
            const messages = await Chat.getAllMessages();
            io.emit ('servers: sendMessages', messages);
            sendMessages();
            }
            socket.on ('client: newMessages', async (data) =>{
                await Chat.saveMessage(data);
                sendMessages();
        });
    });
};