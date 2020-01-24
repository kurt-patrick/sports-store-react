import React, {useState, useContext} from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { UserContext } from './user-context';
import { useSelector, useDispatch } from 'react-redux';
import {signIn} from './actions';

function Login() {

    const [alert, setAlert] = useState('');
    const {setUser} = useContext(UserContext);
    const history = useHistory();
    const authentication = useSelector(state => state.authentication);
    const dispatch = useDispatch();
  
    const [state, setState] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = e => {
        console.log(`handleSubmit(${state.email}, ${state.password})`);
        e.preventDefault();

        const postBody = {
            email: state.email,
            password: state.password
        };

        dispatch(signIn(postBody));

        setAlert('');
        axios.post(`http://localhost:8080/users/authenticate`, postBody)
            .then(res => {
                console.log('login.response');
                const data = res.data;
                console.log(`data: ${JSON.stringify(data)}`);
                console.log('login.context:');
                console.log('login pre SetUser:');
                setUser({
                    id: data.id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    token: data.token,
                    isAuthenticated: true
                });
                console.log('login post SetUser:');
                history.push("/");
            })
            .catch(err => {
                console.log('error');
                if (err.response) {
                    console.log(`err.response: ${JSON.stringify(err.response)}`);
                    setAlert(err.response.data.message);
                } else {
                    console.log(`err: ${JSON.stringify(err)}`);
                }
                setUser({
                    id: 0,
                    firstName: '',
                    lastName: '',
                    email: '',
                    token: '',
                    isAuthenticated: false
                });
            })

    }

    const hasValidLoginDetails = () => {
        return document.getElementById('email').validity.valid && document.getElementById('password').validity.valid;
    }

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value});
        const isValid = hasValidLoginDetails();
        document.getElementById('login').disabled = !isValid;
    }

    return (
        <div className="container text-white pt-4">
            <h2 className="pb-0">Sign in</h2>
            <form onSubmit={handleSubmit} autoComplete="new-password">
                <div className="form-row pt-4 text-left justify-content-center">
                    <label className="col-3 col-lg-1 col-md-2 col-form-label" htmlFor="email">Email</label>
                    <input value={state.email} onChange={handleChange} type="email" className="form-control form-control-sm col-9 col-lg-4 col-md-6" id="email" name="email" autoComplete="new-password" required />
                </div>
                <div className="form-row text-left justify-content-center">
                    <label className="col-3 col-lg-1 col-md-2" htmlFor="password">Password</label>
                    <input value={state.password} onChange={handleChange} type="password" className="form-control form-control-sm col-9 col-lg-4 col-md-6" id="password" name="password" autoComplete="new-password" required />
                </div>
                {
                    alert ? 
                    <div className="form-row justify-content-center">
                        <label className="col-3 col-lg-1 col-md-2" ></label>
                        <p className="alert alert-danger justify-content-center mt-2 col-9 col-lg-4 col-md-6">{alert}</p> 
                    </div>
                    : null
                }
                <div className="form-row pt-2 justify-content-center">
                    <span className="col-3 col-lg-1 col-md-2" />
                    <button type="submit" id="login" className="btn btn-primary h-100 col-9 col-lg-4 col-md-6">SIGN IN</button>
                </div>
            </form>
        </div>
    );
}

export default Login;