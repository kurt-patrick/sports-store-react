import React, {useContext, useState} from 'react';
import { UserContext } from './user-context';
import { useHistory } from "react-router-dom";
import axios from 'axios';

function Orders() {
    const {user} = useContext(UserContext);
    const history = useHistory();
    const [orders, setOrders] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const handleDateChange = e => {
        const element = document.getElementById('orderNo');
        element.value = null;
    };

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
            <div className="row">
                <div className="col">
                    <p className="text-center pt-2">No orders were found</p>
                </div>
            </div>
        )
    };

    const searchResults = () => {
        return (
            <div className="row pt-4 mt-0">
                <div className="col-12 pt-0 mt-0">
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
                                    <tr key={order.id} onClick={() => handleRowClick(order.id)}>
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
            </div>
        )
    };

    const handleRowClick = orderId => {
        console.log('handleRowClick()');
        history.push(`/orders/${orderId}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const headers = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        };

        let orderNo = document.getElementById('orderNo').value;
        if (isNaN(orderNo) || orderNo < 1) {
            orderNo = 0;
        }
        const fromDate = document.getElementById('fromDate').value;
        const toDate = document.getElementById('toDate').value;

        const url = `http://localhost:8080/orders/search?orderid=${orderNo}&from=${fromDate}&to=${toDate}`; 
        console.log('url: ' + url);

        axios.get(url, headers)
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
                setOrders([]);
                setLoaded(true);
            })

    };

    // https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQgYTVRWnY1BT7_MJZRXGNOg8-eCB9AxYmKSPGly3ifd7pvywBg
    // https://getbootstrap.com/docs/4.4/content/tables/#small-table

    return (
        <div className="container text-white pt-4">
        <div>
            <h2 className="pb-0">Order History</h2>

            <div className="d-flex justify-content-center pb-0 mb-0">
                <form>
                    <div className="form-group row pt-4 pb-0 mb-2">
                        <div className="col-4 text-right">
                            <label htmlFor="orderNo" className="col-form-label-sm">Order no.</label>
                        </div>
                        <div className="col-8">
                            <input type="number" min="1" max="1000000000" maxLength="10" className="form-control form-control-sm" id="orderNo" placeholder="Order no." />
                        </div>
                    </div>
                    <div className="form-group row pt-0 mt-0 mb-2">
                        <div className="col-4 text-right">
                            <label htmlFor="fromDate" className="col-form-label-sm">From</label>
                        </div>
                        <div className="col-8">
                            <input type="date" onChange={handleDateChange} className="form-control form-control-sm" id="fromDate" placeholder="From" />
                        </div>
                    </div>
                    <div className="form-group row pt-0 mt-0 mb-2">
                        <div className="col-4 text-right">
                            <label htmlFor="toDate" className="col-form-label-sm">To</label>
                        </div>
                        <div className="col-8">
                            <input type="date" onChange={handleDateChange} className="form-control form-control-sm" id="toDate" placeholder="To" />
                        </div>
                    </div>
                    <div className="form-group row pb-0">
                        <div className="col-4" />
                        <div className="col-8">
                            <button className="btn-primary form-control form-control-sm" onClick={handleSubmit}>Search</button>
                        </div>
                    </div>
                    <div className="form-group row border-bottom pb-0 mb-0"></div>
                </form>
            </div>

            { loaded && (!orders || orders.length < 1) && noOrdersFound() }
            { orders && orders.length > 0 && searchResults() }
            
        </div>
        </div>
    );
}

export default Orders;