import axios from 'axios';
import _ from 'lodash';

var interval = 1000;
// Get Method.
exports.get = _.debounce(function (url, success, errorFn) {
    axios.get(url)
        .then((response) => {
            success(response)
        })
        .catch((error) => {
            errorFn(error);
        });
},interval);

// Post Method.
exports.post =  _.debounce(function(url, data, success, errorFn) {
    axios.get(url, data)
        .then((response) => {
            success(response)
        })
        .catch((error) => {
            errorFn(error);
        })
},interval);