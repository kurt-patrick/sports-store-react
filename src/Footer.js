import {
    Link
} from 'react-router-dom';
import React, {useContext} from 'react';
import { UserContext } from './user-context';
import './Footer.css';

function Footer(props) {
    return (
    <footer className="text-white">
    <div className="container">
        <div className="row">

            <div className="col-3">
                <hr className="light" />
                <h5>About</h5>
                <hr className="light" />
                <a href="javascript:void">Team Sales</a>
                <a href="javascript:void">About Us</a>
                <a href="javascript:void">Blog</a>
                <a href="javascript:void">Career Opportunities</a>
            </div>

            <div className="col-3">
                <hr className="light" />
                <h5>Customer Service</h5>
                <hr className="light" />
                <a href="javascript:void">08.9400.1234</a>
                <a href="javascript:void">Contact Us</a>
                <a href="javascript:void">Order Status</a>
                <a href="javascript:void">Shipping Info</a>
            </div>
            <div className="col-3">
                <hr className="light" />
                <h5>Popular Links</h5>
                <hr className="light" />
                <a href="javascript:void">Coupons</a>
                <a href="javascript:void">Release Calendar</a>
                <a href="javascript:void">Equipment</a>
                <a href="javascript:void">Jordan</a>
            </div>
            <div className="col-3">
                <hr className="light" />
                <h5>Resources</h5>
                <hr className="light" />
                <a href="javascript:void">App</a>
                <a href="javascript:void">Text Sign-Up</a>
                <a href="javascript:void">Privacy Statement</a>
                <a href="javascript:void">Terms of Use</a>
            </div>

        </div>
        <br />
    </div>
    </footer>
    );
}

export default Footer;