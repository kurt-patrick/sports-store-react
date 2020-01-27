import React from 'react';
import { useHistory } from "react-router-dom";

function ProductSnapshot(props) {
    const history = useHistory();
    const product = props.product;

    const handleClick = (productId) => {
        history.push(`/products/${productId}`);
    };

    const formatPrice = (price) => {
        let value = 0;
        if (price) value = price;
        return new Intl.NumberFormat('en-AU', { 
            style: 'currency', 
            currency: 'AUD' 
        }).format(value);
    };

    return (
        <div className="row h-100 pt-2 pr-1 pl-1 text-white" onClick={() => handleClick(product.id)} >
        <div className="card bg-dark border-info col-12">
            {
            product.imageUrl && 
                <picture>
                    <div className="card-header">
                        <img src={product.imageUrl} className="img-fluid" alt="" />
                    </div>
                </picture>
            }
            <div className="card-body border-top border-bottom border-info">
                <div className="row">
                    <div className="col">
                        <h6 className="card-title mb-1"><b>{ product.productName }</b></h6>
                        <p className="card-text mt-0 text-truncate">
                            { product.gender === 0 ? 'Mens' : 'Womens' }
                            {' - '}
                            { product.colourDescription }
                        </p>
                    </div>
                </div>
            </div>
            <div className="card-footer">
                <h6 className="card-text">{ formatPrice(product.productPrice) }</h6>
            </div>
        </div>
        </div>
    );
}

export default ProductSnapshot;