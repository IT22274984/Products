import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AddProduct.css';

export default function UpdateProduct() {
    let navigate = useNavigate();

    const [productnumber, setProductNumber] = useState("");
    const [productname, setProductName] = useState("");
    const [productdealerprice, setProductDealerPrice] = useState("");
    const [productprofitrate, setProductProfitRate] = useState("");
    const [productsellingprice, setProductSellingPrice] = useState("");
    const [productcollecteddate, setProductCollectedDate] = useState("");
    const [id, setID] = useState("");
    const [formError, setFormError] = useState("");

    // Load initial product data from localStorage
    useEffect(() => {
        const storedDate = localStorage.getItem('productcollecteddate');
        setProductNumber(localStorage.getItem('productnumber') || "");
        setProductName(localStorage.getItem('productname') || "");
        setProductDealerPrice(localStorage.getItem('productdealerprice') || "");
        setProductProfitRate(localStorage.getItem('productprofitrate') || "");
        setProductSellingPrice(localStorage.getItem('productsellingprice') || "");
        setProductCollectedDate(storedDate ? new Date(storedDate).toISOString().slice(0, 10) : "");
        setID(localStorage.getItem('id') || "");
    }, []);

    // Calculate selling price based on dealer price and profit rate
    const calculateSellingPrice = () => {
        const dealerPrice = parseFloat(productdealerprice) || 0;
        const profitRate = parseFloat(productprofitrate) || 0;

        if (dealerPrice >= 0 && profitRate >= 0) {
            const sellingPrice = dealerPrice + (dealerPrice * profitRate / 100);
            setProductSellingPrice(sellingPrice.toFixed(2)); // Limit to 2 decimal places
        } else {
            setProductSellingPrice(""); // Clear selling price if invalid
        }
    };

    // Validate the form fields before submission
    const validateForm = () => {
        if (!productnumber || !productname || !productdealerprice || !productprofitrate || !productcollecteddate) {
            setFormError("Please fill in all fields.");
            return false;
        }
        if (parseFloat(productdealerprice) < 0 || parseFloat(productprofitrate) < 0) {
            setFormError("Dealer price and profit rate must be non-negative.");
            return false;
        }
        setFormError(""); // Clear error if validation passes
        return true;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const updatedProduct = {
                productnumber,
                productname,
                dealerprice: parseFloat(productdealerprice) || 0,
                profitrate: parseFloat(productprofitrate) || 0,
                sellingprice: parseFloat(productsellingprice) || 0,
                collecteddate: productcollecteddate
            };

            try {
                await axios.put(`http://localhost:8080/products/${id}`, updatedProduct);
                alert("Product Updated Successfully");
                navigate('/products');
                localStorage.clear();
            } catch (error) {
                alert(error.message || "Error updating product.");
            }
        }
    };

    return (
        <div className='container'>
            <h2>Update Product</h2>
            <form onSubmit={handleSubmit} className="my-form">
                <div className="mb-3">
                    <label htmlFor="productnumber" className="form-label">Product Number</label>
                    <input
                        type="text"
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
                {formError && <p className="text-danger">{formError}</p>}
                <button type="submit" className="btn btn-primary">UPDATE</button>
            </form>
        </div>
    );
}
