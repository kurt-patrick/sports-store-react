import {
    Link
} from 'react-router-dom';
import React, {useContext} from 'react';
import { UserContext } from './user-context';

function Nav(props) {
    const {user, setUser} = useContext(UserContext);

    const handleLogout = () => {
        setUser({
            id: 0,
            firstName: '',
            lastName: '',
            email: '',
            token: '',
            isAuthenticated: false
        });
    }

    return (
        <div>
            { !user.isAuthenticated && <Link className="text-white" to="/login">Sign in</Link> }
            { user.isAuthenticated && <Link className="text-white" to="/" onClick={handleLogout}>Sign out</Link> }
            <header>
                <nav className="navbar navbar-expand navbar-red bg-primary mt-1">
                <div className="container-fluid">

                    <Link className="navbar-brand" to="/">React Store</Link>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" 
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/products">PRODUCTS</Link>
                            </li>

                            {
                                user.isAuthenticated &&
                                    <li className="nav-item">
                                        <Link className="nav-link text-white" to="/orders">Orders</Link>
                                    </li>
                            }
                        </ul>

                        <div className="form-inline">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-light my-2 my-sm-0 mr-sm-2" type="button">Search</button>
                            <button className="btn btn-outline-light my-2 my-sm-0" type="button" to="/cart">Cart</button>
                        </div>

                    </div>
                </div>
                </nav>
            </header>
        </div>
      );
}

export default Nav;