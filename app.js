const express = require('express');
const app = express();
app.use(express.json());
const mongo_sanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');


const users = [];
const products = [{ id: 1, name: 'tasty apple' }];
const orders = [];
const apiRequests = [];


const regex = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;

app.use(mongo_sanitize());

app.use(xss());

app.post('/api/order', (req, res) => {
    let { first_name, last_name, phone_number, product_id } = req.body;

    if (!first_name || typeof first_name!="string") {
        apiRequests.push({ method: req.method, url: req.url, body: req.body, status: 400, message: 'Invalid first name. Please enter a valid string.', timestamp: new Date() });        
        return res.status(400).json({ error: 'Invalid first name. Please enter a valid string.' });
    }

    if(!last_name || typeof last_name!="string") {
        apiRequests.push({ method: req.method, url: req.url, body: req.body, status: 400, message: 'Invalid last name. Please enter a valid string.', timestamp: new Date() });   
        return res.status(400).json({ error: 'Invalid last name. Please enter a valid string.' });
    }

    if(!phone_number || typeof phone_number!="string"|| !phone_number.match(regex)) {
        apiRequests.push({ method: req.method, url: req.url, body: req.body, status: 400, message: 'Invalid phone number. Please enter a valid phone number in one of the following forms: (123) 456-7890, ' +    
        '+(123) 456-7890, +(123)-456-7890, +(123) - 456-7890, +(123) - 456-78-90, 123-456-7890, 123.456.7890, 1234567890, +31636363634, 075-63546725.', timestamp: new Date() });   
        return res.status(400).json({ error: 'Invalid phone number. Please enter a valid phone number in one of the following forms: (123) 456-7890, ' +
        '+(123) 456-7890, +(123)-456-7890, +(123) - 456-7890, +(123) - 456-78-90, 123-456-7890, 123.456.7890, 1234567890, +31636363634, 075-63546725.' });
    }

    first_name = first_name.trim();
    last_name = last_name.trim();
    phone_number = phone_number.trim();

    if(!Number.isInteger(product_id)) {
        apiRequests.push({ method: req.method, url: req.url, body: req.body, status: 400, message: 'Invalid product id. Please enter a valid integer.', timestamp: new Date() });   
        return res.status(400).json({ error: 'Invalid product id. Please enter a valid integer.', timestamp: new Date()  });
    }

    const product = products.find(p => p.id === product_id);
    if (!product) {
        apiRequests.push({ method: req.method, url: req.url, body: req.body, status: 400, message: 'Product not found', timestamp: new Date() });   
        return res.status(400).json({ error: 'Product not found', timestamp: new Date()  });
    }
    let user = users.find(u => u.phone_number === phone_number);
    try{
    if (!user) {
        user = { id: users.length + 1, first_name, last_name, phone_number };
        users.push(user);
    }}catch(err){
        apiRequests.push({ method: req.method, url: req.url, body: req.body, status: 400, message: 'User could not be created. Please try again at a later time.', timestamp: new Date() });   
        return res.status(400).json({error: 'User could not be created. Please try again at a later time.'});
    }


    const order = { id: orders.length + 1, user_id: user.id, product_id };
    orders.push(order);
    apiRequests.push({ method: req.method, url: req.url, body: req.body, status: 200, message: 'Order created successfully', timestamp: new Date() });   
    res.status(200).json({ message: 'Order created successfully', order });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});