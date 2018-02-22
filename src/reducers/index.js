import {combineReducers} from 'redux';

import {generateProducts} from '../utils/data';
import {ACTION_TYPES} from '../actions';


// you'll notice I set my initial state below on line 13 to equal this object! This is a common pattern
const INITIAL_STATE = {
    productList: generateProducts(10),
    searchString: '' // hint for optional homework
};

export const products = (state = INITIAL_STATE, {type, payload}) => {
    switch (type) {
        case ACTION_TYPES.addProduct:
            // using object spread, I am saying - I want to return the old state, except change the productList property
            return {...state, productList: state.productList.concat(payload.product)};
    }
    return state;
};


// This is how you can combine many reducers into one large reducer:
// https://redux.js.org/api-reference/combinereducers
export default combineReducers({
    products,
});
