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
          <Route path="/login" exact component={Login} />
          <Route path="/orders" exact component={Orders} />
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
