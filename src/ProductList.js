import {
    Link
} from 'react-router-dom';
import React, {useContext} from 'react';
import { UserContext } from './user-context';

function ProductList(props) {
    return (
        <div class="container">
        <div class="card-group">
            {
            /*
            <div *ngFor="let product of products$ | async" class="col-lg-3 col-md-4 col-sm-6 col-xs-6">
            <app-product-snapshot [product]="product"></app-product-snapshot>
            </div>
            */
            }
        </div>
        </div>
    );
}

export default ProductList;