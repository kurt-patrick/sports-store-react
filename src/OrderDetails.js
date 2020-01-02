import React, {useContext, useState, Fragment} from 'react';
import { UserContext } from './user-context';
import { useHistory, Redirect } from "react-router-dom";
import axios from 'axios';
import Spinner from './Spinner';
import './App.css';

function OrderDetails(props) {

    let order = null;

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

    const blankCard = (header) => {
        return (
            <div className="card bg-light mb-2">
                <div className="card-header text-left pb-2">
                    { header ? <h5>{header}</h5> : null }
                </div>
                <div className="card-body text-left pt-2 pb-2">
                    <Spinner />
                </div>
            </div>
        );
    };

    const orderHeader = () => {
        if (!order) return blankCard("Order details");

        return (
        <div className="card bg-light">
            <div className="card-header text-left pb-2">
                <h5>Order #{props.match.params.id} details</h5>
            </div>
            <div className="card-body text-left pt-2 pb-2">
                Date created:&nbsp;{order.orderDate}
            </div>
        </div>
        );
    }

    const orderItems = () => {
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

    const orderFooter = () => {
        if (!order) return blankCard(null);

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
                            <td scope="col" className="col-2 text-center">{formatNumber(1)}</td>
                        </tr>
                        <tr>
                            <th scope="col" className="col-6"></th>
                            <th scope="col" className="col-2 text-center"></th>
                            <th scope="col" className="col-2 text-center">Gst</th>
                            <td scope="col" className="col-2 text-center">{formatNumber(2)}</td>
                        </tr>
                        <tr>
                            <th scope="col" className="col-6"></th>
                            <th scope="col" className="col-2 text-center"></th>
                            <th scope="col" className="col-2 text-center">Total</th>
                            <td scope="col" className="col-2 text-center">{formatNumber(3)}</td>
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
                    {orderHeader()}
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    {orderItems()}
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    {orderFooter()}
                </div>
            </div>
        </div>
    );

}

export default OrderDetails;