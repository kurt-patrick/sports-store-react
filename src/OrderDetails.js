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

    const redirectToLogin = () => {
        history.push("/login");
    };

    const redirectToHome = () => {
        history.push("/");
    };

        /*
        axios.get(url, headers)
            .then(res => {
                console.log('Orders (get) response');
                const data = res.data;
                console.log(`data: ${JSON.stringify(data)}`);
                setOrder(data);
            })
            .catch(err => {
                console.log('Orders (get) error');
                if (err.response) {
                    console.log(`err.response: ${JSON.stringify(err.response)}`);
                    if (err.response.status === 401) {
                        redirectToLogin();
                    }
                } else {
                    console.log(`err: ${JSON.stringify(err)}`);
                }
            })
            */

    useEffect(() => {
        console.log('OrderDetails.useEffect');
        /*
        if (!user || !user.token) {
            console.log('!user');
            redirectToLogin();
        }
        let orderNo = props.match.params.id;
        if (isNaN(orderNo) || orderNo < 1) {
            console.log('!orderNo');
            redirectToHome();
        }
        */

        const fetchOrder = async (token, orderId) => {
            const headers = {
                headers: { 
                    Authorization: `Bearer ${token}`
                }
            };

            const result = await axios(
                `http://localhost:8080/orders/search?orderid=${orderId}`, 
                headers);
            setOrder(result.data);
        };

        fetchOrder('a', 1);
    }, []);

    const order1 = {
        id: 1,
        orderDate: '2019-01-01',
        exTotal: 300,
        incTotal: 330,
        gst: 30,
        items: [
            {
                productName: 'Jordan Retro 12',
                incPrice: 150,
                incTotal: 300,
                quantity: 2,
            },
            {
                productName: 'Jordan Retro 11',
                incPrice: 100,
                incTotal: 110,
                quantity: 1,
            }
        ]
    };

    const formatNumber = (num) => {
        const formatter = new Intl.NumberFormat('en-AU', {
            style: 'currency',
            currency: 'AUD'
        });
        return formatter.format(num);
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
                Date created:&nbsp;{order.orderDate}
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
                <table className="table table-sm table-hover table-borderless">
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
                                    <td>Jordan Retro 12</td>
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
                            <td className="col-2 text-center">{formatNumber(1)}</td>
                        </tr>
                        <tr>
                            <th scope="col" className="col-6"></th>
                            <th scope="col" className="col-2 text-center"></th>
                            <th scope="col" className="col-2 text-center">Gst</th>
                            <td className="col-2 text-center">{formatNumber(2)}</td>
                        </tr>
                        <tr>
                            <th scope="col" className="col-6"></th>
                            <th scope="col" className="col-2 text-center"></th>
                            <th scope="col" className="col-2 text-center">Total</th>
                            <td className="col-2 text-center">{formatNumber(3)}</td>
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