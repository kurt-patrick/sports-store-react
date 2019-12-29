import React, {useState, useContext} from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { UserContext } from './user-context';

function Login() {

    const [alert, setAlert] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {setUser} = useContext(UserContext);
    const history = useHistory();

    const handleSubmit = e => {
        console.log(`handleSubmit(${email}, ${password})`);
        e.preventDefault();

        const postBody = {
            email: email,
            password: password
        };

        setAlert('');
        axios.post(`http://localhost:8080/users/authenticate`, postBody)
            .then(res => {
                console.log('login.response');
                const data = res.data;
                console.log(`data: ${JSON.stringify(data)}`);
                console.log('login.context:');
                //console.log(JSON.stringify(user));
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
                console.log(`err.response: ${JSON.stringify(err.response)}`);
                setAlert(err.response.data.message);
                setUser({
                    id: 0,
                    firstName: '',
                    lastName: '',
                    email: '',
                    token: '',
                    isAuthenticated: false
                });
                //console.log(`context: ${JSON.stringify(this.context)}`);
            })

    }

    const hasValidLoginDetails = () => {
        return document.getElementById('email').validity.valid && document.getElementById('password').validity.valid;
    }

    const handleChange = (e) => {
        const value = e.target.value;
        switch (e.target.name) {
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                console.error('Unhandled case: ' + e.target.name);
        }
        const isValid = hasValidLoginDetails();
        document.getElementById('login').disabled = !isValid;
    }

    return (
        <div className="container text-white pt-4">
            <div className="row d-flex justify-content-center pt-4">
                <div className="col-lg-4 col-md-6 col-sm-8 col-xs-8">

                    <h2 className="pb-4">Sign in</h2>
                    <form onSubmit={handleSubmit} autoComplete="new-password">
                        <div className="form-group text-left">
                            <label htmlFor="email">Email</label>
                            <input value={email} onChange={handleChange} type="email" className="form-control" id="email" name="email" autoComplete="new-password" required />
                        </div>
                        <div className="form-group text-left">
                            <label htmlFor="password">Password</label>
                            <input value={password} onChange={handleChange} type="password" className="form-control" id="password" name="password" autoComplete="new-password" required />
                        </div>
                        {
                            alert ? <p className="alert alert-danger">{alert}</p> : null
                        }
                        <div className="col pl-0 pr-0">
                            <button type="submit" id="login" className="btn btn-primary w-100 h-100">SIGN IN</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default Login;