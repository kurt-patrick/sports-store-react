import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';
import Nav from './Nav';
import Login from './Login';
import Home from './Home';
import Orders from './Orders';

function App() {

  const [user, setUser] = useState({
    id: 0,
    firstName: '',
    email: '',
    token: '',
    loggedIn: false
  });

  return (
    <Router>
      <div className="App">
        <Nav />
        <Route 
          path="/" exact 
          render={ (props) => <Home {...user} /> } />
        <Route path="/login" exact component={Login} />
        <Route path="/order" exact component={Orders} />
        <Route path="/orders" exact component={Orders} />
      </div>
    </Router>
  );
}

export default App;
