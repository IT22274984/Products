import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
    let navigate = useNavigate();

    const [productnumber, setProductNumber] = useState("");
    const [productname, setProductName] = useState("");
    const [productdealerprice, setProductDealerPrice] = useState("");
    const [productprofitrate, setProductProfitRate] = useState("");
    const [productsellingprice, setProductSellingPrice] = useState("");
    const [productcollecteddate, setProductCollectedDate] = useState("");

    const calculateSellingPrice = () => {
        const dealerPrice = parseFloat(productdealerprice) || 0;
        const profitRate = parseFloat(productprofitrate) || 0;

        // Calculate selling price
        const sellingPrice = dealerPrice + (dealerPrice * (profitRate / 100));
        setProductSellingPrice(sellingPrice.toFixed(2));
    };

    const addProduct = async (e) => {
        e.preventDefault();

        const newProduct = {
            productnumber,
            productname,
            dealerprice: parseFloat(productdealerprice) || 0,
            profitrate: parseFloat(productprofitrate) || 0,
            sellingprice: parseFloat(productsellingprice) || 0,
            collecteddate: productcollecteddate
        };

        await axios.post("http://localhost:8080/products", newProduct)
            .then(() => {
                alert("Product Added Successfully");
                navigate('/products');
            })
            .catch(err => {
                alert(err.message || "Error adding product");
            });
    };

    return (
        <div className="container">
            <h2>Add New Product</h2>
            <form onSubmit={addProduct}>
                <div>
                    <label>Product Number</label>
                    <input
                        type="text"
                        value={productnumber}
                        onChange={(e) => setProductNumber(e.target.value)}
                    />
                </div>
                <div>
                    <label>Product Name</label>
                    <input
                        type="text"
                        value={productname}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Dealer Price</label>
                    <input
                        type="number"
                        value={productdealerprice}
                        onChange={(e) => {
                            setProductDealerPrice(e.target.value);
                            calculateSellingPrice();
                        }}
                    />
                </div>
                <div>
                    <label>Profit Rate (%)</label>
                    <input
                        type="number"
                        value={productprofitrate}
                        onChange={(e) => {
                            setProductProfitRate(e.target.value);
                            calculateSellingPrice();
                        }}
                    />
                </div>
                <div>
                    <label>Selling Price</label>
                    <input type="text" value={productsellingprice} readOnly />
                </div>
                <div>
                    <label>Collected Date</label>
                    <input
                        type="date"
                        value={productcollecteddate}
                        onChange={(e) => setProductCollectedDate(e.target.value)}
                    />
                </div>
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
}
