import React, { Fragment } from 'react';
import spinner from './spinner.gif';
import spinner2 from './ajax-loader.gif';

function Spinner() {
    return (
        <Fragment>
            <img
                src={spinner2}
                style={{ width: '150px', margin: 'auto', display: 'block' }}
                alt='Loading...'
            />
        </Fragment>
    );
};

export default Spinner;