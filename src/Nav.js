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
            { !user.isAuthenticated ? <Link className="text-white" to="/login">Sign in</Link> : null }
            { user.isAuthenticated ? <Link className="text-white" to="/" onClick={handleLogout}>Sign out</Link> : null }
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
                                user.isAuthenticated ?
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