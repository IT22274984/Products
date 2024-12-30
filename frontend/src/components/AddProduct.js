import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../styles/Footer.css';
import '../styles/AddProduct.css';

export default function AddProduct() {
    let navigate = useNavigate();

    const [productnumber, setProductNumber] = useState("");
    const [productname, setProductName] = useState("");
    const [productdealerprice, setProductDealerPrice] = useState("");
    const [productprofitrate, setProductProfitRate] = useState("");
    const [productsellingprice, setProductSellingPrice] = useState("");
    const [productcollecteddate, setProductCollectedDate] = useState("");

    const calculateSellingPrice = () => {
        // Convert the input values to numbers
        const dealerPrice = parseFloat(productdealerprice) || 0; // Default to 0 if not a valid number
        const profitRate = parseFloat(productprofitrate) || 0; // Default to 0 if not a valid number
        
        // Calculate the selling price
        const sellingPrice = dealerPrice + (dealerPrice * (profitRate / 100));
        
        // Update the state with the calculated selling price (rounded to 2 decimal places)
        setProductSellingPrice(sellingPrice.toFixed(2)); 
    };
    

    async function addProduct(e) {
        e.preventDefault();

        const newProduct = {
            productnumber,
            productname,
            dealerprice: productdealerprice,
            profitrate: productprofitrate,
            sellingprice: productsellingprice,
            collecteddate: productcollecteddate

        };

        await axios.post("http://localhost:8080/products", newProduct)
            .then(() => {
                alert("Product Added Successfully");
                navigate('/products');
            })
            .catch(err => {
                alert(err);
            });
    }

    return (
        <>
            <div className='container'>
                <br />
                <form onSubmit={addProduct} className="my-form">
                    <div className="mb-3">
                        <label htmlFor="productnumber" className="form-label">Product Number</label>
                        <input
                            type="number"
                            className="form-control"
                            id="productnumber"
                            placeholder="Enter Product Number"
                            value={productnumber}
                            onChange={(e) => setProductNumber(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productname" className="form-label">Product Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="productname"
                            placeholder="Enter Product Name"
                            value={productname}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productdealerprice" className="form-label">Dealer's Price</label>
                        <input
                            type="number"
                            className="form-control"
                            id="productdealerprice"
                            placeholder="Enter Dealer's Price"
                            value={productdealerprice}
                            onChange={(e) => {
                                setProductDealerPrice(e.target.value);
                                calculateSellingPrice();
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productprofitrate" className="form-label">Profit Rate (%)</label>
                        <input
                            type="number"
                            className="form-control"
                            id="productprofitrate"
                            placeholder="Enter Profit Rate"
                            value={productprofitrate}
                            onChange={(e) => {
                                setProductProfitRate(e.target.value);
                                calculateSellingPrice();
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productsellingprice" className="form-label">Selling Price</label>
                        <input
                            type="text"
                            className="form-control"
                            id="productsellingprice"
                            value={productsellingprice}
                            readOnly
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productcollecteddate" className="form-label">Collected Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="productcollecteddate"
                            value={productcollecteddate}
                            onChange={(e) => setProductCollectedDate(e.target.value)}
                        />
                    </div>
                    <button type="submit">ADD</button>
                </form>
            </div>
        </>
    );
}
