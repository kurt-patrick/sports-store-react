import authenticationReducer from "./authenticationReducer";
import {combineReducers} from 'redux';

const storeReducers = combineReducers({
    authentication: authenticationReducer
});
export default storeReducers;