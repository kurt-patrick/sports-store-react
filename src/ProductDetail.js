import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Spinner from './Spinner';

function ProductDetail(props) {
    const [product, setProduct] = useState([]);
    const [alert, setAlert] = useState(null);

    const handleAddToCart = () => {
    };

    const formatPrice = (price) => {
        let value = 0;
        if (price) value = price;
        return new Intl.NumberFormat('en-AU', { 
            style: 'currency', 
            currency: 'AUD' 
        }).format(value);
    };

    useEffect(() => {
        const fetchProducts = async (productId) => {
            try {
                setAlert(null);

                const url = `http://localhost:8080/products/${productId}`;

                console.log(`url: ${url}`);

                const result = await axios(url);

                console.log(`result: ${JSON.stringify(result)}`);
    
                if (result && result.data) {
                    setProduct(result.data);
                }

            } catch (err) {
                console.log('OrderDetails (get) error');
                if (err.response) {
                    console.log(`err.response: ${JSON.stringify(err.response)}`);
                } else {
                    console.log(`err: ${JSON.stringify(err)}`);
                }
                setAlert(err);
                setProduct([]);
            }

        };

        fetchProducts(props.match.params.id);

        console.count('product list refreshing');

    }, []);        

    if (!product) {
        return (
            <div className="container">
                <Spinner />
                <h4 className="pt-0 mt-0 text-white">Loading...</h4>
            </div>
        );
    }

    return (
        <div className="container">

            <div className="row">
                <div className="col-lg-12">
                    <p className="text-white">Home &gt; { product.productName } - Men's</p>
                </div>
            </div>


            <div className="row h-100 pt-2 pr-2 border border-secondary">

                <div className="col-lg-8">
                    {
                        product.imageUrl &&
                        <picture>
                            <div className="card-header">
                                <img src={product.imageUrl} className="img-fluid" />
                            </div>
                        </picture>
                    }
                </div>

                <div className="col-lg-4">

                    <h1 className="mb-1 text-white"><b>{ product.productName }</b></h1>
                    <h6 className="mb-1 text-white">{ product.gender === 0 ? 'Mens' : 'Womens' }</h6>
                    <h6 className="mb-1 text-white">{ product.colourDescription }</h6>
                    <h6 className="mb-1 text-white">{ formatPrice(product.productPrice) }</h6>

                    <div className="pt-3 text-white">
                        <hr className="pt-0 mt-0 pb-1" />
                        <app-product-sizes></app-product-sizes>
                        <hr className="" />
                    </div>

                    <div>

                        <div className="text-white row">
                            <div className="col-4">
                            <span className="form-label">QTY</span>
                            </div>
                            <div className="col-8">
                            </div>
                        </div>

                        <div className="text-white row">
                            <div className="col-3 pr-0">
                                <select className="custom-select" id="inputGroupSelect04" aria-hidden="true">
                                    <option defaultValue="1" value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>

                            <div className="col-9 pl-1">
                                <button onClick={() => handleAddToCart()} className="btn btn-success h-100 w-100">ADD TO CART</button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default ProductDetail;