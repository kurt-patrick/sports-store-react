import React, {useContext, useState, useEffect} from 'react';
import { UserContext } from './user-context';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Spinner from './Spinner';
import './App.css';

function OrderDetails(props) {
    const {user} = useContext(UserContext);
    const history = useHistory();
    const [order, setOrder] = useState(null);
    const [alert, setAlert] = useState(null);

    const redirectToLogin = () => {
        history.push("/login");
    };

    const redirectToHome = () => {
        history.push("/");
    };

    // https://reactjs.org/docs/hooks-reference.html#useeffect
    useEffect(() => {
        console.log('OrderDetails.useEffect');
        console.log(`user: ${JSON.stringify(user)}`);
        if (!user || !user.token) {
            console.log('!user');
            redirectToLogin();
        }
        let orderId = props.match.params.id;
        if (isNaN(orderId) || orderId < 1) {
            console.log('!orderId');
            redirectToHome();
        }

        const fetchOrder = async (token, orderId) => {
            const headers = {
                headers: { 
                    Authorization: `Bearer ${token}`
                }
            };

            try {
                setAlert(null);
                const result = await axios(
                    `http://localhost:8080/orders/search?orderid=${orderId}`, 
                    headers);
    
                console.log(`result: ${JSON.stringify(result)}`);
                console.log(`result.data: ${JSON.stringify(result.data)}`);

                if (result.data && result.data.length > 0) {
                    setOrder(result.data[0]);
                }

            } catch (err) {
                console.log('OrderDetails (get) error');
                if (err.response) {
                    console.log(`err.response: ${JSON.stringify(err.response)}`);
                    if (err.response.status === 401) {
                        history.push("/login");
                    }
                } else {
                    console.log(`err: ${JSON.stringify(err)}`);
                }
                setAlert(err);
                setOrder(null);
            }

        };

        fetchOrder(user.token, orderId);

    }, []);

    const formatNumber = (num) => {
        const formatter = new Intl.NumberFormat('en-AU', {
            style: 'currency',
            currency: 'AUD'
        });
        return formatter.format(num);
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

    const blankCard = (headerText) => {
        return (
            <div className="card bg-light mb-2">
                <div className="card-header text-left pb-2">
                    { headerText ? <h5>{headerText}</h5> : null }
                </div>
                <div className="card-body text-left pt-2 pb-2">
                    <Spinner />
                </div>
            </div>
        );
    };

    const orderHeader = (order) => {
        if (!order) return blankCard("Order details");

        return (
        <div className="card bg-light">
            <div className="card-header text-left pb-2">
                <h5>Order #{order.id} details</h5>
            </div>
            <div className="card-body text-left pt-2 pb-2">
                Date created:&nbsp;{formatDate(order.orderDate)}
            </div>
        </div>
        );
    }

    const orderItems = (order) => {
        if (!order) return blankCard("Items");

        return (
        <div className="card bg-light mt-2">
            <div className="card-header text-left">
                <h5>Items</h5>
            </div>
            <div className="card-body text-left pb-0">
                <table className="table table-sm table-borderless">
                    <thead>
                        <tr>
                            <th scope="col" className="col-6">Product Name</th>
                            <th scope="col" className="col-2 text-center">Price</th>
                            <th scope="col" className="col-2 text-center">Qty</th>
                            <th scope="col" className="col-2 text-center">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        order.items.map((item, index, array) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.productName}</td>
                                    <td className="text-center">{formatNumber(item.incPrice)}</td>
                                    <td className="text-center">{item.quantity}</td>
                                    <td className="text-center">{formatNumber(item.incTotal)}</td>
                                </tr>
                            );
                        })
                    }

                    </tbody>
                </table>
            </div>
        </div>
        );
    };

    const orderFooter = (order) => {
        if (!order) return blankCard();

        return (
        <div className="card bg-light mt-2">
            <div className="card-header text-left pb-0">
                <table className="table table-sm table-borderless">
                    <thead></thead>
                    <tbody>
                        <tr>
                            <th scope="col" className="col-6"></th>
                            <th scope="col" className="col-2 text-center"></th>
                            <th scope="col" className="col-2 text-center">Subtotal</th>
                            <td className="col-2 text-center">{formatNumber(order.exTotal)}</td>
                        </tr>
                        <tr>
                            <th scope="col" className="col-6"></th>
                            <th scope="col" className="col-2 text-center"></th>
                            <th scope="col" className="col-2 text-center">Gst</th>
                            <td className="col-2 text-center">{formatNumber(order.gst)}</td>
                        </tr>
                        <tr>
                            <th scope="col" className="col-6"></th>
                            <th scope="col" className="col-2 text-center"></th>
                            <th scope="col" className="col-2 text-center">Total</th>
                            <td className="col-2 text-center">{formatNumber(order.incTotal)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        );
    };


    // https://docs.woocommerce.com/wp-content/uploads/2013/05/single-order-page.png
    // <div className="row d-flex justify-content-center pt-0">
    return (
        <div className="container pt-4">
            {
                alert ? <p className="alert alert-danger">{alert}</p> : null
            }
            <div className="row">
                <div className="col-12">
                    {orderHeader(order)}
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    {orderItems(order)}
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    {orderFooter(order)}
                </div>
            </div>
        </div>
    );

}

export default OrderDetails;