const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse the body of POST requests
app.use(bodyParser.urlencoded({ extended: false }));

// First middleware (this always runs)
app.use('/', (req, res, next) => {
    console.log('This always runs!');
    next();
});

// Middleware to handle GET requests to /add-product
app.use('/add-product', (req, res, next) => {
    console.log('In another middleware!');
    res.send(`
        <form action="/product" method="POST">
            <input type="text" name="title" placeholder="Product Title"><br>
            <input type="text" name="size" placeholder="Product Size"><br>
            <button type="submit">Add Product</button>
        </form>
    `);
});

// Middleware to handle POST requests to /product
app.use('/product', (req, res, next) => {
    console.log('Product title:', req.body.title);  // Log product title
    console.log('Product size:', req.body.size);    // Log product size
    res.redirect('/');
});

// Final middleware to handle GET requests to the root '/'
app.use('/', (req, res, next) => {
    console.log('In another middleware!');
    res.send('<h1>Hello from Express!</h1>');
});

// Start the server on port 8000
app.listen(8000, () => {
    console.log('Server is running on port 8000');
});

