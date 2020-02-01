import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import BreadCrumbs from './BreadCrumbs';
import { UserContext } from './user-context';
import { useHistory } from "react-router-dom";

function ProductDetail(props) {
    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [alert, setAlert] = useState(null);
    const {user} = useContext(UserContext);
    const history = useHistory();
    const [flagAddToCart, setFlagAddToCart] = useState(false);

    const handleAddToCart = (e) => {
        e.preventDefault();
        setFlagAddToCart(true);
    };

    const genderText = (gender) => {
        if (gender === 'undefined' || gender === null) return '';
        return gender === 0 ? 'Mens' : 'Womens';
    };

    const formatPrice = (price) => {
        let value = 0;
        if (price) value = price;
        return new Intl.NumberFormat('en-AU', { 
            style: 'currency', 
            currency: 'AUD' 
        }).format(value);
    };

    const getCartGuid = async () => {
        console.log('getCartGuid()');
    
        let cartGuid = localStorage.getItem('cart-guid');
        if (cartGuid && cartGuid.trim().length === 36) {
            console.log(`cart guid from local storage ${cartGuid}`);
            return cartGuid;
        }
    
        const url = `http://localhost:8080/cart/create`; 
        console.log('calling (get) ' + url);

        const res = await axios.get(url);
        cartGuid = res.data.guid;

        console.log(`cart guid from server: ${cartGuid}`);
        localStorage.setItem('cart-guid', cartGuid);

        return cartGuid;
    };

    const addProductToCart = async (guid, id, qty) => {
        console.log(`addProductToCart(${guid}, ${id}, ${qty})`);

        try {
            setAlert(null);
            const url = `http://localhost:8080/cart/${guid}/add`; 
            const postData = {
                "ProductId": id,
                "Quantity": Number.parseInt(qty),
            };
            console.log('about to (post) to ' + url);
            console.log('body: ' + JSON.stringify(postData));
    
            const res = await axios.post(url, postData);

            console.log('/cart/add (post) response');
            console.log(`response: ${JSON.stringify(res.data)}`);
            localStorage.setItem('cart', JSON.stringify(res.data));

        } catch (err) {
            console.log('addProductToCart (post) error');
            if (err.response) {
                console.log(`err.response: ${JSON.stringify(err.response)}`);
                if (err.response.status === 401) {
                    history.push("/login");
                }
            }
            else 
            {
                console.log(`err: ${JSON.stringify(err)}`);
                setAlert(err);
            }
        }
    };

    useEffect(() => {
        const fetchProduct = async (productId) => {
            try {
                setAlert(null);
                const url = `http://localhost:8080/products/${productId}`;
                const result = await axios(url);
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

        fetchProduct(props.match.params.id);

        console.count('product list refreshing');

    }, []); 

    useEffect(() => {

        const addToCart = async (id, qty) => {
            const cartGuid = await getCartGuid();
            if (cartGuid) {
                const addResponse = await addProductToCart(cartGuid, id, qty);
            }
        };

        if (flagAddToCart) {
            setFlagAddToCart(false);
            addToCart(product.id, quantity);
            console.count('flagAddToCart');
        }

    }, [flagAddToCart]); 

    if (!product) {
        return (
            <div className="container">
                <Spinner />
                <h4 className="pt-0 mt-0 text-white">Loading...</h4>
            </div>
        );
    }

    const crums = [
        {to: "/products", text: "Products"},
        {text: `${product.productName} - ${genderText(product.gender)}`}
    ];

    return (
        <div className="container">

            <BreadCrumbs crums={crums}/>

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
                    <h6 className="mb-1 text-white">{ genderText(product.gender) }</h6>
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
                                <select 
                                    className="custom-select" 
                                    id="inputGroupSelect04" 
                                    aria-hidden="true"
                                    onChange={(e) => setQuantity(e.target.value)}
                                    value={quantity}
                                >
                                    <option defaultValue="1" value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>

                            <div className="col-9 pl-1">
                                <button 
                                    onClick={(e) => handleAddToCart(e)} 
                                    className="btn btn-success h-100 w-100">ADD TO CART
                                </button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default ProductDetail;