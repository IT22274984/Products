const Product = require('../models/Product');

// Create and save a new product
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }

    const { productnumber, productname, dealerprice, profitrate, collecteddate } = req.body;

    // Calculate selling price
    const sellingprice = dealerprice + (dealerprice * (profitrate / 100));

    // Create new product
    const product = new Product({
        productnumber,
        productname,
        dealerprice,
        profitrate,
        sellingprice,
        collecteddate
    });

    // Save product in the database
    product.save()
        .then(() => {
            res.status(201).send({ message: "Product Registered Successfully" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while registering the product" });
        });
};

// Retrieve and return all products
exports.findAll = (req, res) => {
    Product.find()
        .then(products => {
            res.send(products);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error Occurred while retrieving product information" });
        });
};

// Retrieve and return a single product by ID
exports.findOne = (req, res) => {
    if (req.params.id) {
        const id = req.params.id;

        Product.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Product not found with id " + id });
                } else {
                    res.send(data);
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error retrieving product with id " + id });
            });
    }
};

// Update a product by ID
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Data to update cannot be empty" });
    }

    const id = req.params.id;

    // Recalculate selling price if dealerprice or profitrate is updated
    if (req.body.dealerprice && req.body.profitrate) {
        req.body.sellingprice = req.body.dealerprice + (req.body.dealerprice * (req.body.profitrate / 100));
    }

    Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot update product with id ${id}. Maybe product not found!` });
            } else {
                res.status(201).send({ message: "Product details updated successfully", data });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error occurred while updating product information" });
        });
};

// Delete a product by ID
exports.delete = (req, res) => {
    const id = req.params.id;

    Product.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot delete product with id ${id}. Maybe id is incorrect` });
            } else {
                res.status(201).send({ message: "Product details deleted successfully" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ message: `Error deleting product with id = ${id}` });
        });
};
