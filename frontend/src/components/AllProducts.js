import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AllProducts.css';
import '../styles/Footer.css';

export default function AllProducts() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    let navigate = useNavigate();

    const getData = async () => {
        try {
            const res = await axios.get("http://localhost:8080/products");
            console.log("Fetched Products:", res.data); // Log API response
            setProducts(res.data);
        } catch (err) {
            console.error("Error fetching products:", err.message);
            alert("Failed to fetch products. Please check the backend and try again.");
        }
    };
    

    const GenerateReport = () => {
        const XLSX = require("xlsx");
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(products);
        XLSX.utils.book_append_sheet(wb, ws, "Product Report");
        const wbBlob = new Blob([XLSX.write(wb, { type: "array", bookType: "xlsx" })], { type: "application/octet-stream" });
        const url = URL.createObjectURL(wbBlob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "Product-report.xlsx");
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const onDelete = async (id) => {
        await axios.delete(`http://localhost:8080/products/${id}`)
            .then(() => {
                alert("Product Deleted Successfully");
                getData();
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    const onUpdate = (data) => {
        localStorage.setItem('id', data._id);
        localStorage.setItem('productnumber', data.productnumber);
        localStorage.setItem('productname', data.productname);
        localStorage.setItem('dealerprice', data.dealerprice);
        localStorage.setItem('profitrate', data.profitrate);
        localStorage.setItem('sellingprice', data.sellingprice);
        localStorage.setItem('collecteddate', data.collecteddate);

        navigate('/update-product');
    };

    const filteredProducts = products.filter((products) => {
        return products.productname.toLowerCase().includes(searchTerm.toLowerCase());
    });
    

    return (
        <>
            <div className="container">
                <h1 style={{ textAlign: 'center', fontFamily: 'cursive', fontSize: '50px' }}>All Products</h1>
                <div className="container">
                    <div>
                        <button className="button-add" onClick={() => navigate("/add-product")}>
                            Add Products
                        </button>
                    </div>
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search by Product Name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        type="button"
                        className="btn-report"
                        onClick={() => GenerateReport()}
                    >
                        Generate Report
                    </button>
                    <table style={{ textAlign: 'center' }}>
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'center' }}>Product Number</th>
                                <th style={{ textAlign: 'center' }}>Product Name</th>
                                <th style={{ textAlign: 'center' }}>Dealer Price</th>
                                <th style={{ textAlign: 'center' }}>Profit Rate</th>
                                <th style={{ textAlign: 'center' }}>Selling Price</th>
                                <th style={{ textAlign: 'center' }}>Collected Date</th>
                                
                            </tr>
                        </thead>
                        <tbody>
    {filteredProducts.length > 0 ? (
        filteredProducts.map(product => (
            <tr key={product._id}>
                <td>{product.productnumber}</td>
                <td>{product.productname}</td>
                <td>{product.dealerprice}</td>
                <td>{product.profitrate}%</td>
                <td>{product.sellingprice}</td>
                <td>{product.collecteddate}</td>
                <td>
                    <button type='button' className="btn-update" onClick={() => onUpdate(product)}>Update</button>
                    &nbsp;
                    <button type='button' className="btn-delete" onClick={() => onDelete(product._id)}>Delete</button>
                </td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan="6">No products found</td>
        </tr>
    )}
</tbody>

                    </table>
                </div>
            </div>
        </>
    );
}
