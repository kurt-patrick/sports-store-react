import React, {useContext, useState} from 'react';
import { UserContext } from './user-context';
import { useHistory, Redirect } from "react-router-dom";
import axios from 'axios';

function Orders() {
    const {user} = useContext(UserContext);
    const history = useHistory();
    const [orders, setOrders] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const formatDate = date => {
        if (!date) {
            return '-';
        }

        try {
            const arr = date.match(/\d+/g);
            const utcDate = new Date(Date.UTC(arr[0], arr[1], arr[2]));
            const formatter = new Intl.DateTimeFormat('en-AU', { 
                year: 'numeric',
                month: 'long', 
                day: '2-digit' 
            });
            return formatter.format(utcDate);
        } catch (error) {
            return date;
        }
    };

    const noOrdersFound = () => {
        return (
            <div className="row"><br /><p>No orders were found</p></div>
        )
    };

    const searchResults = () => {
        return (
            <div className="row">
                <br />
                <table className="table table-sm table-dark table-hover">
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
                                    <td>{formatDate(order.orderDate)}</td>
                                    <td>
                                        {new Intl.NumberFormat('en-AU', { 
                                            style: 'currency', 
                                            currency: 'AUD' 
                                        }).format(order.incTotal)}
                                    </td>
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
                console.log('Orders (get) response');
                const data = res.data;
                console.log(`data: ${JSON.stringify(data)}`);
                setOrders([...data]);
                setLoaded(true);
            })
            .catch(err => {
                console.log('Orders (get) error');
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

    return (
        <div className="container-fluid text-white pt-4">
        <div className="row d-flex justify-content-center pt-0">
        <div>
            { console.log("Orders() user: " + JSON.stringify(user)) }
            { console.log("Orders() user.isAuthenticated: " + user.isAuthenticated) }

            <h2 className="pb-4">Order History</h2>
            <form>
                <div className="form-group row pt-4">
                    <label htmlFor="orderNo" className="col-sm-3 col-form-label-sm text-left">Order no.</label>
                    <div className="col-sm-4">
                        <input type="number" min="1" max="1000000000" maxLength="10" className="form-control form-control-sm" id="orderNo" placeholder="Order no." />
                    </div>
                    <label htmlFor="fromDate" className="col-sm-1 col-form-label-sm">From</label>
                    <div className="col-sm-4">
                        <input type="date" className="form-control form-control-sm" id="fromDate" placeholder="From" />
                    </div>
                </div>
                <div className="form-group row pb-0">
                <div className="col-sm-3" />
                    <div className="col-sm-4">
                        <button className="btn-primary form-control form-control-sm" onClick={handleClick}>Search</button>
                    </div>
                    <label htmlFor="toDate" className="col-sm-1 col-form-label-sm">To</label>
                    <div className="col-sm-4">
                        <input type="date" className="form-control form-control-sm" id="toDate" placeholder="To" />
                    </div>
                </div>
                <div className="form-group row border-bottom">
                </div>
            </form>

            { console.log(`orders: ${JSON.stringify(orders)}`) }
            { loaded && (!orders || orders.length < 1) && noOrdersFound() }
            { orders && orders.length > 0 && searchResults() }
            
        </div>
        </div>
        </div>
    );
}

export default Orders;