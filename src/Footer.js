import {
    Link
} from 'react-router-dom';
import React from 'react';
import './Footer.css';

function Footer(props) {
    return (
    <footer className="text-white border-top border-primary pt-4">
    <div className="container pt-2">
        <div className="row">

            <div className="col-3">
                <h5>About</h5>
                <hr className="light" />
                <Link to="#">Team Sales</Link>
                <Link to="#">About Us</Link>
                <Link to="#">Blog</Link>
                <Link to="#">Career Opportunities</Link>
            </div>

            <div className="col-3">
                <h5>Customer Service</h5>
                <hr className="light" />
                <Link to="#">08.9400.1234</Link>
                <Link to="#">Contact Us</Link>
                <Link to="#">Order Status</Link>
                <Link to="#">Shipping Info</Link>
            </div>
            <div className="col-3">
                <h5>Popular Links</h5>
                <hr className="light" />
                <Link to="#">Coupons</Link>
                <Link to="#">Release Calendar</Link>
                <Link to="#">Equipment</Link>
                <Link to="#">Jordan</Link>
            </div>
            <div className="col-3">
                <h5>Resources</h5>
                <hr className="light" />
                <Link to="#">App</Link>
                <Link to="#">Text Sign-Up</Link>
                <Link to="#">Privacy Statement</Link>
                <Link to="#">Terms of Use</Link>
            </div>

        </div>
        <br />
    </div>
    </footer>
    );
}

export default Footer;