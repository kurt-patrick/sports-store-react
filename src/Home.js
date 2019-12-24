import React, {useState} from 'react';
import {
  Link,
} from 'react-router-dom';
import './App.css';
import Nav from './Nav';
import Login from './Login';
import Orders from './Orders';

function Home({loggedIn}) {
  return (
    <div>
      <h1 className="text-white">home page</h1>
      { !loggedIn ? <Login /> : <Orders /> }
    </div>
);
}
export default Home;
