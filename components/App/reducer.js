import _ from 'lodash';

export function updateList(state, action) {
    var newState = Object.assign({}, state);

    if (action.data.listName === newState.selectedItem.listName) {
        return newState;
    }

    switch(action.data.listName) {
        case "AllSearchList": {
            var index = _.findIndex(newState.favouriteShows, function(v) { return v.id == newState.selectedItem.id }),
                array = newState.favouriteShows;

            array.splice(index, 1);
            newState.favouriteShows = array;
            newState.allShows =  (!_.isEmpty(newState.allShows))?_.concat(newState.allShows, newState.selectedItem):_.concat([], newState.selectedItem);

            array = JSON.parse(window.localStorage.getItem('favouriteShows', []));
            index = _.findIndex(array, newState.selectedItem);
            array.splice(index, 1);

            window.localStorage.setItem('favouriteShows', JSON.stringify(array));
            break;
        }
        case "FavouriteList": {
            var index = _.findIndex(newState.allShows, function(v) { return v.id == newState.selectedItem.id }),
                array = newState.allShows;

            array.splice(index, 1);
            newState.favouriteShows = (!_.isEmpty(newState.favouriteShows))? _.concat(newState.favouriteShows, newState.selectedItem):_.concat([], newState.selectedItem);
            newState.allShows = array;

            array = JSON.parse(window.localStorage.getItem('favouriteShows', []));
            array = (!_.isEmpty(array))?_.concat(array, newState.selectedItem):_.concat([], newState.selectedItem);

            window.localStorage.setItem('favouriteShows', JSON.stringify(array));
            break;
        }
    }

    return newState;
}

export function updateFavouriteList(state, action) {
    var newState = Object.assign({}, state);

    var favouriteShows = [],
        favourite = window.localStorage.getItem('favouriteShows', []);

    if (action.data != "") {
        let regEx = new RegExp(action.data, 'i');
        favouriteShows = _.filter(JSON.parse(favourite), function (value, key) {
            if (value.name.match(regEx)){
                return value;
            }
        })
    } else {
        favouriteShows = JSON.parse(favourite)
    }

    newState.favouriteShows = favouriteShows;

    return newState;
}