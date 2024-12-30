import React from 'react';
import css from '../styles/NavBar.module.css';

function NavBar() {

    // Assuming you have user information in localStorage or state
    const userName = localStorage.getItem('userName') || 'Guest';

    const getGreetingMessage = () => {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();

        if (currentHour < 12) {
            return `Good morning, ${userName}!`;
        } else if (currentHour < 18) {
            return `Good afternoon, ${userName}!`;
        } else {
            return `Good evening, ${userName}!`;
        }
    }

    return (
        <div className={css.navbarContainer}>
            <div className={css.greeting}>
                {getGreetingMessage()}
            </div>
            <p className={css.appointmentBooking}>
                Welcome to Product Management! Manage your products efficiently with our easy-to-use system. From adding new products to managing inventory and pricing, everything is at your fingertips. Whether you're a store owner or product manager, our platform provides the tools you need to streamline your operations and ensure your business runs smoothly. Start managing your products today and take your business to the next level!
            </p>
        </div>
    );
}

export default NavBar;
