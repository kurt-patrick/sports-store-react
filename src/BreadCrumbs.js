import React from 'react';
import {Link} from 'react-router-dom';

function BreadCrumbs(props) {

    const createLiAndLink = ({to, text}) => {
        if (!to) {
            return <li className="breadcrumb-item active" aria-current="page">{text}</li>
        } else {
            return <li className="breadcrumb-item"><Link to={to}>{text}</Link></li>;
        }
    };

    return (
        <div className="row pt-2 pb-1">
            <div className="col pl-0 ml-0">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb pl-0 pb-0 pt-0 mt-1 mb-1">
                        {createLiAndLink({to: '/', text: 'Home'})}
                        {
                            props.crums && props.crums.map(link => {
                                return createLiAndLink(link);
                            })
                        }
                    </ol>
                </nav>
            </div>
        </div>
    );
}
export default BreadCrumbs;