import {
    Link, useHistory
} from 'react-router-dom';
import React, {useContext} from 'react';
import { UserContext } from './user-context';
import { useState } from 'react';

function Nav(props) {
    const {user, setUser} = useContext(UserContext);
    const [state, setState] = useState('');
    const history = useHistory();

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

    const handleSearch = (e) => {
        e.preventDefault();
        if (state) {
            history.push(`/products/search/${state}`);
            setState('');
        }
    }

    const handleCartClick = (e) => {
        e.preventDefault();
        history.push(`/cart`);
    }

    return (
        <div>
            { !user.isAuthenticated && <Link className="text-white" to="/login">Sign in</Link> }
            { user.isAuthenticated && <Link className="text-white" to="/" onClick={handleLogout}>Sign out</Link> }
            <header>
                <nav className="navbar navbar-expand navbar-red bg-primary mt-1">
                    <div className="container-fluid">

                        <Link className="navbar-brand text-white" to="/">React Store</Link>

                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" 
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarNav">

                            <div className="float-left">
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
                            </div>

                        </div>

                        <div className="form-inline float-right ">
                            <input 
                                className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" 
                                value={state}
                                onChange={e => setState(e.target.value)}
                                onKeyPress={e=> {
                                    if (e.key === 'Enter') {
                                        handleSearch(e);
                                    }
                                }}
                            />
                            <button id="search" 
                                disabled={!state}
                                onClick={(e) => handleSearch(e)}
                                className="btn btn-outline-light my-2 my-sm-0 mr-sm-2" 
                                type="button">Search
                            </button>
                            <button 
                                onClick={(e) => handleCartClick(e)}
                                className="btn btn-outline-light my-2 my-sm-0" 
                                type="button" 
                                to="/cart">Cart
                            </button>
                        </div>

                    </div>

                </nav>

            </header>
        </div>
      );
}

export default Nav;