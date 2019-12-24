import React, {useState, useReducer} from 'react';
import axios from 'axios';

function Login() {

    const [alert, setAlert] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
                console.log('response');
                const data = res.data;
                console.log(`data: ${JSON.stringify(data)}`);
            })
            .catch(err => {
                console.log('error');
                console.log(`err.response: ${JSON.stringify(err.response)}`);
                setAlert(err.response.data.message);
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