import axios from 'axios';

var action_type = {
    ALL_SHOW: "ALL_SHOW",
    FAVOURITE_LIST: "FAVOURITE_LIST",
    SET_ITEM: "SET_ITEM",
    DROP_ITEM: "DROP_ITEM",
    FILTER_FAVOURITE: "FILTER_FAVOURITE"
};

export function getAllShows() {
    return dispatch => {
        return axios.get('http://api.tvmaze.com/shows')
    }
}

export function getSearchShows(data) {
    return dispatch => {
        return axios.get('http://api.tvmaze.com/search/shows?q='+data)
    }
}

export function updateAllShow(data) {
    return {
        type: action_type.ALL_SHOW,
        data
    }
}

export function updateFavoriteList(data) {
    return {
        type: action_type.FAVOURITE_LIST,
        data
    }
}

export function setItem(data) {
    return {
        type: action_type.SET_ITEM,
        data : { selectedItem: Object.assign({}, data.value, {"listName": data.listName}) }
    }
}

export function dropItem(data) {
    return {
        type: action_type.DROP_ITEM,
        data
    }
}

export function updateFavouriteList(data) {
    return {
        type: action_type.FILTER_FAVOURITE,
        data
    }
}