import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import BreadCrumbs from './BreadCrumbs';
import ProductSnapshot from './ProductSnapshot';

function ProductList(props) {
    const [products, setProducts] = useState([]);
    const [alert, setAlert] = useState(null);
    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setAlert(null);
                setNoResults(false);
                let url = 'http://localhost:8080/products';

                if (props.match.params && props.match.params.name) {
                    url += `/search?name=${props.match.params.name}`;
                }

                const result = await axios(url);
                if (result && result.data && result.data.length) {
                    setProducts(result.data);
                } else {
                    setProducts([]);
                    setNoResults(true);
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

    }, [props.match.url]);    

    const crums = [{text: "Products"}];

    if (noResults === true) {
        return (
            <div className="container">
                <BreadCrumbs crums={crums} />
                <h4 className="pt-4 mt-4 text-white">Search has returned no results</h4>
            </div>
        );
    }

    if (!products || !products.length) {
        return (
            <div className="container">
                <BreadCrumbs crums={crums} />
                <Spinner />
                <h4 className="pt-0 mt-0 text-white">Loading...</h4>
            </div>
        );
    }

    return (
        <div className="container">
            <BreadCrumbs crums={crums} />
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