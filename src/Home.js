import React, {useContext} from 'react';
import './App.css';
import Login from './Login';
import { UserContext } from './user-context';

function Home() {
  const {user} = useContext(UserContext);

  return (
    <div>
      { console.log("Home() user: " + JSON.stringify(user)) }
      { console.log("Home() user.isAuthenticated: " + user.isAuthenticated) }
      { user.isAuthenticated ? <React.Fragment><h1>home page</h1></React.Fragment> : <Login /> }
    </div>
  );
}
export default Home;
