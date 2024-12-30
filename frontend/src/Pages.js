import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AddProduct from './components/AddProduct';
import AllProducts from './components/AllProducts';
import ViewReport from './components/ViewReport';
import Home from './components/Home';
// import Header from './components/Header';

import UpdateProduct from './components/UpdateProduct';
import NavBar from './components/NavBar';


function Pages() {
  return (
    <Router>
      <div>
        {/* <Header/> */}
        {<NavBar/>}
        <Routes>
          <Route path="/products" element={<AllProducts/>}/>
          <Route path="/add-product" element={<AddProduct/>}/>
          <Route path="/update-product" element={<UpdateProduct/>}/>
          <Route path="/view-report" element={<ViewReport/>}/>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </div>
    </Router>
  );
} 

export default Pages;

