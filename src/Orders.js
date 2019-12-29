import React, {useContext, useState} from 'react';
import { UserContext } from './user-context';
import { useHistory, Redirect } from "react-router-dom";
import axios from 'axios';

function Orders() {
    const {user} = useContext(UserContext);
    const history = useHistory();
    const [orders, setOrders] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const noOrdersFound = () => {
        return (
            <div className="row"><br /><p>No orders were found</p></div>
        )
    };

    const searchResults = () => {
        return (
            <div className="row">
                <br />
                <table className="table table-sm table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Date</th>
                            <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        orders.map((order, index, array) => {
                            return (
                                <tr key={order.id}>
                                    <th scope="row">{order.id}</th>
                                    <td>-</td>
                                    <td>${order.incTotal.toFixed(2)}</td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    };

    const handleClick = (e) => {
        e.preventDefault();

        const headers = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        };

        axios.get(`http://localhost:8080/orders`, headers)
            .then(res => {
                console.log('login.response');
                const data = res.data;
                console.log(`data: ${JSON.stringify(data)}`);
                console.log('login.context:');
                //console.log(JSON.stringify(user));
                console.log('login pre SetUser:');
                setOrders([...data]);
                setLoaded(true);
            })
            .catch(err => {
                console.log('error');
                if (err.response) {
                    console.log(`err.response: ${JSON.stringify(err.response)}`);
                    if (err.response.status === 401) {
                        history.push("/login");
                    }
                } else {
                    console.log(`err: ${JSON.stringify(err)}`);
                }
            })


    };

    // https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQgYTVRWnY1BT7_MJZRXGNOg8-eCB9AxYmKSPGly3ifd7pvywBg
    // https://getbootstrap.com/docs/4.4/content/tables/#small-table

    return user.isAuthenticated === true ? (
        <div className="container text-white pt-4">
        <div className="row d-flex justify-content-center pt-4">
        <div className="col-lg-4 col-md-6 col-sm-8 col-xs-8">
            { console.log("Orders() user: " + JSON.stringify(user)) }
            { console.log("Orders() user.isAuthenticated: " + user.isAuthenticated) }

            <h2>Order History</h2>
            <button className="btn btn-primary mb-4" onClick={handleClick}>Load Orders</button>

            { console.log(`orders: ${JSON.stringify(orders)}`) }
            { loaded && (!orders || orders.length < 1) && noOrdersFound() }
            { orders && orders.length > 0 && searchResults() }
            
        </div>
        </div>
        </div>
    ) : (
        <Redirect to='/login' />
    );
}

export default Orders;