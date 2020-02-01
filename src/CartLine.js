import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function CartLine(props) {
    const cartItem = props.cartItem;
    const [quantity, setQuantity] = useState(cartItem.quantity ? cartItem.quantity : 1);
    const selectValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const handleDelete = (productId) => {

    };

    return (
        <div className="row pb-2">

            <div className="col-2">
            {
                cartItem.imageUrl &&
                <picture>
                    <img src={cartItem.imageUrl} className="img-fluid" />
                </picture>
            }
            </div>
            <div className="col-sm-8 col-xs-7">
                <div className="row"><b>{ cartItem.productName }</b></div>
                <div className="row">{ cartItem.description }</div>
                <div className="row pt-2">
                    <select 
                        className="custom-select-sm" 
                        id="quantity" 
                        aria-hidden="true" 
                        onChange={(e) => setQuantity(e.target.value)}
                        defaultValue={quantity}
                    >
                    {
                        selectValues.map(value => {
                            return <option value={value} key={value}>Qty: {value}</option>
                        })
                    }
                    </select>
                </div>
                <div className="row pt-2 pb-0">
                    <label>Unit Price: {cartItem.exPrice}</label>
                </div>
                <div className="row pt-0">
                    <Link className="link" to='' onClick={() => handleDelete(cartItem.productId)}>Delete</Link>
                </div>
            </div>

            <div className="col-2 text-right">
                <label><b>{cartItem.incPrice}</b></label>
                <div className="row"></div>
                <div className="row"></div>
                <div className="row"></div>
                <div className="row"></div>
            </div>

        </div>

    );
};
export default CartLine;
