import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from './user-context'

export const ProtectedRoute = ({component: Component, ...rest}) => {
    const {user} = useContext(UserContext);
    const loginRoute = props => {
        return {
            pathname: "/login",
            state: {
                from: props.location
            }
        };
    };
    return (
        <Route 
            {...rest}
            render={
                props => {
                    if (user.isAuthenticated === true) {
                        return (<Component {...props} />);
                    } else {
                        return (<Redirect to={loginRoute(props)} />);
                    }
                }
            }
        />
    );
};