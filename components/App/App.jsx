import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'lodash';
import List from '../List/List';
import * as AppActions from './actions';

// App starter component
class App extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeShow = this.onChangeShow.bind(this);
    }

    // on component mount update the list of data
    componentDidMount() {
        this.props.getAllShows()
            .then((response) => {
                var shows = [];
                _.each(response.data, (value, key) => {
                    shows.push({
                        name: value.name,
                        id: value.id
                    });
                });

                this.props.updateAllShow({
                    allShows : _.differenceBy(shows, JSON.parse(window.localStorage.getItem('favouriteShows', [])), "id")
                });
            })
            .catch(err => {
                console.log(err);
            });

        var favourite = JSON.parse(window.localStorage.getItem('favouriteShows', []));

        this.props.updateFavoriteList({favouriteShows: favourite});
    }

    // on searching
    onChangeShow(event) {
        if (ReactDOM.findDOMNode(this.refs.searchShow).value != '') {
            this.props.getSearchShows(ReactDOM.findDOMNode(this.refs.searchShow).value)
                .then((response) => {
                    var shows = [];
                    _.each(response.data, (value, key) => {
                        shows.push({
                            name: value.show.name,
                            id: value.show.id
                        });
                    });

                    this.props.updateAllShow({
                        allShows : _.differenceBy(shows, JSON.parse(window.localStorage.getItem('favouriteShows', [])), "id")
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            this.props.getAllShows()
                .then((response) => {
                    var shows = [];
                    _.each(response.data, (value, key) => {
                        shows.push({
                            name: value.name,
                            id: value.id
                        });
                    });

                    this.props.updateAllShow({
                        allShows : _.differenceBy(shows, JSON.parse(window.localStorage.getItem('favouriteShows', [])), "id")
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        }

    }

    render() {
        return (
            <section className="container-fluid">
                <div className="container">
                    <div className="row">
                        <form>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label htmlFor="searchShow">Search Shows</label>
                                    <input type="shows" className="form-control" id="searchShow" ref="searchShow" placeholder="Type to Search" onChange={_.debounce(this.onChangeShow, 1000)}/>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label htmlFor="favourite">Favourites</label>
                                    <input name="favourites" className="form-control" id="favourite" placeholder="Type to Filter" onChange={(e) => this.props.updateFavouriteList(e.currentTarget.value)}/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            {(this.props != null)? <List shows={this.props.allShows} listName="AllSearchList" onDragStart={this.props.setItem}  onDragStop={this.props.dropItem}/>
                                : null }
                        </div>
                        <div className="col-sm-6">
                            {(this.props != null)? <List shows={this.props.favouriteShows} listName="FavouriteList" onDragStart={this.props.setItem}  onDragStop={this.props.dropItem}/>
                                :null}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return state
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Object.assign({}, AppActions), dispatch)
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DragDropContext(HTML5Backend)(App));