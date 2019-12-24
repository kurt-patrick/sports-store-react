import {
    Link
} from 'react-router-dom';
import React from 'react';

function Nav(props) {
    return (
        <div>
            { !props.loggedIn ? <Link className="text-white" to="/login">Login</Link> : null }
            { props.loggedIn ? <Link className="text-white" to="/logout">Logout</Link> : null }
            <header>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link className="navbar-brand" to="/">React Store</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" 
                            data-target="#navbarNav" aria-controls="navbarNav" 
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            {
                                props.loggedIn ?
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/orders">Orders</Link>
                            </li> : null
                            }
                        </ul>
                    </div>
                </nav>
            </header>
        </div>
      );
}

export default Nav;