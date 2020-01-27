import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import ProductSnapshot from './ProductSnapshot';

function ProductList(props) {
    const [products, setProducts] = useState([]);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setAlert(null);
                const result = await axios('http://localhost:8080/products');
    
                if (result && result.data && result.data.length) {
                    setProducts(result.data);
                }

            } catch (err) {
                console.log('OrderDetails (get) error');
                if (err.response) {
                    console.log(`err.response: ${JSON.stringify(err.response)}`);
                } else {
                    console.log(`err: ${JSON.stringify(err)}`);
                }
                setAlert(err);
                setProducts([]);
            }

        };

        fetchProducts();

        console.count('product list refreshing');

    }, []);    

    if (!products || !products.length) {
        return (
            <div className="container">
                <Spinner />
                <h4 className="pt-0 mt-0 text-white">Loading...</h4>
            </div>
        );
    }

    return (
        <div className="container">
        { alert && <p className="alert alert-danger">{alert}</p> }
        <div className="card-group">
            <div className="row">
            {
                products.map(product => {
                    return (
                        <div key={product.id} className="col-6 col-lg-3 col-md-4 col-sm-6 col-xs-6">
                            <ProductSnapshot product={product} />
                        </div>
                    )
                })
            }
            </div>
        </div>
        </div>
    );
}

export default ProductList;