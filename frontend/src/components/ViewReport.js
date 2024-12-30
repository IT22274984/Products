import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ViewReport.css'

export default function AllProducts() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const getData = async () => {
        await axios.get("http://localhost:8080/products")  // Assuming your API endpoint for products is '/products'
        .then((res) => {            
            setProducts(res.data);
        })
        .catch((err) => {
            alert(err.message);
        });
    }

    const GenerateReport = () => {
        const XLSX = require("xlsx");
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(products); // Generating report for products
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

    useEffect(() => {
        getData();
    }, []);

    if (!products) return alert("No Products");

    const filteredProducts = products.filter((product) => {
        return product.productname.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <>
            <div className="container">
                <h1 style={{ textAlign: 'center', fontFamily: 'cursive', fontSize: '50px' }}>All Products</h1>
                <div className="container">
                    <div>
                        <br /> <br />
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
                        onClick={() => GenerateReport()}>Generate Report</button>
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
                            {filteredProducts.map(product => (
                                <tr key={product._id}>
                                    <td style={{ textAlign: 'center' }}>{product.productnumber}</td>
                                    <td>{product.productname}</td>
                                    <td>{product.productdealerprice}</td>
                                    <td>{product.productprofitrate}%</td>
                                    <td>{product.productsellingprice}</td>
                                    <td>{new Date(product.productcollecteddate).toISOString().slice(0, 10)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
