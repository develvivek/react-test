import * as AppReducer from './components/App/reducer';

const initialState = {};

var action_type = {
    ALL_SHOW: "ALL_SHOW",
    FAVOURITE_LIST: "FAVOURITE_LIST",
    SET_ITEM: "SET_ITEM",
    DROP_ITEM: "DROP_ITEM",
    FILTER_FAVOURITE: "FILTER_FAVOURITE"
};
const reducer = function (state = initialState, action) {
    switch (action.type) {
        case action_type.ALL_SHOW: {
            return Object.assign({}, state, action.data);
            break;
        }
        case action_type.FAVOURITE_LIST: {
            return Object.assign({}, state, action.data);
            break;
        }
        case action_type.SET_ITEM: {
            return Object.assign({}, state, action.data);
            break;
        }
        case action_type.DROP_ITEM: {
            return Object.assign({}, AppReducer.updateList(state, action));
            break;
        }
        case action_type.FILTER_FAVOURITE: {
            return Object.assign({}, AppReducer.updateFavouriteList(state, action));
            break;
        }
        default:
            return state;
    }
};

export default reducer;