import React, {Component} from 'react';
import ListItem from './ListItem';
import { DropTarget } from 'react-dnd';
import _ from 'lodash';

const Types = {
    SHOW: 'shows'
};

// DND drop target object
const dropTarget = {
    drop(props) {
        props.onDragStop({
            listName: props.listName
        });
    }
};

// DND collect fucntion
function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

class List extends Component {
    render() {
        const { connectDropTarget, isOver } = this.props;
        return connectDropTarget(
            <ul className="list-group" style={{ borderColor: "#aaaaaa", borderStyle: "dashed", borderWidth: (isOver)?"1px":"0px", minHeight: "200px" }}>
                {(!_.isEmpty(this.props.shows)) ?
                    this.props.shows.map((value, key) => {
                    return <ListItem key={key} value={value} onDragStart={this.props.onDragStart} listName={this.props.listName} />
                }):null}
            </ul>
        )
    }
}

export default DropTarget(Types.SHOW, dropTarget, collect)(List);