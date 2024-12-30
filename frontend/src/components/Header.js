import "./Header.css";
import img from "../../assets/logo.png"; // Update with your logo path
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Removing token to log out
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div className="header">
      <div className="header-inner">
        <div className="group-child" />
      </div>
      <div className="logout">
        <nav>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </div>
      <div className="library">
        <NavLink to="/products">Products</NavLink>
      </div>
      <div className="support">
        <NavLink to="/support">Support</NavLink>
      </div>
      <div className="home">
        <NavLink to="/">Home</NavLink>
      </div>
      <div className="appointment">
        <NavLink to="/add-product">Add Product</NavLink>
      </div>

      
    </div>
  );
};

export default Header;

//<img className="logo-1-icon" alt="logo" src={img} />