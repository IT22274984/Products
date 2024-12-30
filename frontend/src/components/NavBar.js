import React from 'react';
import { Link } from 'react-router-dom';
import css from '../styles/NavBar.module.css';

function NavBar() {
    // Assuming the user is logged in and we have user data in localStorage
    const userName = localStorage.getItem('userName') || 'Guest';  // Example of how to personalize if needed

    return (
        <div className={css.navbarContainer}>
            <Link to='/' className={css.logo}>KG Fancy</Link>
            <nav className={css.navigation}>
                <Link to='/' className={css.navLink}>Home</Link>
                <Link to='/products' className={css.navLink}>Products</Link>
                <Link to='/account' className={css.navLink}>Account</Link>
                <Link to='/support' className={css.navLink}>Support</Link>
                {userName !== 'Guest' && (
                    <div className={css.userGreeting}>Welcome, {userName}!</div>
                )}
            </nav>
        </div>
    );
}

export default NavBar;
