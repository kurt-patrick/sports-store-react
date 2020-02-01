import React from 'react';

function Alert(props) {
    if (!props.alert) return null;
    return (
        <div>
            <p className="alert alert-danger">{props.alert}</p>
        </div>
    );
}
export default Alert;
