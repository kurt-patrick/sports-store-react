import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import './App.css';
import Nav from './Nav';
import Login from './Login';
import Home from './Home';
import Orders from './Orders';
import { UserContext } from './user-context';
import { ProtectedRoute } from './protected-route';
import OrderDetails from './OrderDetails';
import Footer from './Footer';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';

function App() {

  const [user, setUser] = useState({
    id: 0,
    firstName: '',
    email: '',
    token: '',
    isAuthenticated: false
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <div className="App">
          <Nav />
          <Route path="/" exact component={Home} />
          <Route path="/home" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/products" exact component={ProductList} />
          <Route path="/products/search/:name" exact component={ProductList} />
          <Route path="/products/:id" exact component={ProductDetail} />
          <ProtectedRoute path="/orders" exact component={Orders} />
          <ProtectedRoute path="/orders/:id" exact component={OrderDetails} />
          <Footer />
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
