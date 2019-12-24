import React, {useState} from 'react';

function Orders() {
    return (
        <div className="container text-white pt-4">
            <div className="row d-flex justify-content-center pt-4">
                <div className="col-lg-4 col-md-6 col-sm-8 col-xs-8">

                    <h2>Order History</h2>
                    <div className="form-group">
                        <label for="email">EMAIL ADDRESS</label>
                        <input type="email" className="form-control" id="email" name="email" autocomplete="off" required />
                    </div>
                    <div className="form-group">
                        <label for="password">PASSWORD</label>
                        <input type="password" className="form-control" name="password" id="password" autocomplete="off" required />
                    </div>
                    <div className="form-group">
                        <a className="link" href="#">Forgot Password</a>
                    </div>
                    <div className="alert alert-danger">blah</div>
                    <div className="form-inline">
                        <div className="col pl-0 pr-1">
                        <a className="btn btn-outline-success w-100" href="javascript:void" onClick="createAccount()">REGISTER</a>
                        </div>
                        <div className="col pl-0 pr-0">
                            <a className="btn btn-primary w-100 h-100" href="" onClick="signIn()">SIGN IN</a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Orders;