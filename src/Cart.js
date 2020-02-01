import React, { useState } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import BreadCrumbs from './BreadCrumbs';
import Alert from './Alert';
import { useHistory } from 'react-router-dom';
import CartLine from './CartLine';

function Cart(props) {
    const [alert, setAlert] = useState(null);
    const crums = [{text: "Cart"}];
    const history = useHistory();
    const [cacheLoaded, setCacheLoaded] =  useState(false);
    const [cart, SetCart] = useState(null);

    const handleCheckout = (e) => {
        e.preventDefault();
        history.push('/checkout');
    };

    const setCartFromLocalStorage = () => {
        if (!cacheLoaded) {
            try {
                const item = localStorage.getItem('cart');
                if (item) {
                    SetCart(JSON.parse(item));
                }
            } catch (error) {
                setAlert(error);
                console.log(`getCartFromLocalStorage() error: ${error}`);
            }
            setCacheLoaded(true);
        }
    };

    setCartFromLocalStorage();

    if (!cart || !cart.items) {
        return (
            <div className="container text-white">
                <BreadCrumbs crums={crums} />
                <Alert alert={alert} />
                <p className="pt-4">There are no items in your cart</p>
            </div>
        );
    }

    const totalQuantity = 1;
    const subtotal = 1;
    const cartItems = cart.items;

    return (
        <div className="container text-white">
            <BreadCrumbs crums={crums} />
            <Alert alert={alert} />
            <div className="row">
                <div className="col-6">
                    <h4 className="pb-1">Shopping Cart</h4>
                </div>
                <div className="col-6 text-right pt-2">
                    <label><b>Price</b></label>
                </div>
            </div>

            <hr className="border" />
            <div className="cart-header pb-4">
                <div className="cart-items">
                {
                    cartItems.map(cartItem => {
                        return (
                            <div className="cart-line" key={cartItem.productId}>
                                <CartLine cartItem={cartItem} />
                            </div>
                        )
                    })
                }
                </div>

                <div className="row">
                    <div className="col-6 pt-0">
                        <button className="btn btn-success" onClick={(e) => handleCheckout(e)}>Proceed to checkout</button>
                    </div>
                    <div className="col-6 text-right pt-0">
                        <h6><b>Subtotal ({totalQuantity} items): {subtotal}</b></h6>
                    </div>
                </div>

            </div>

        </div>
    );
};
export default Cart;
