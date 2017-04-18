import React, {Component} from 'react';
import { DragSource } from 'react-dnd';

const Types = {
    SHOW: 'shows'
};

// DND drag source properties
const dragSource = {
    beginDrag(props) {
        props.onDragStart({
            value: props.value,
            listName: props.listName
        });
        return {
            value: props.value
        }
    }
};

// DND collect function
function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

class ListItem extends Component {
    render() {
        const { connectDragSource, isDragging } = this.props;
        return connectDragSource(
            <li className="list-group-item" style={{opacity: isDragging?0.5:1 }}>
                {this.props.value.name}
            </li>
        );
    }
}

export default DragSource(Types.SHOW, dragSource, collect)(ListItem);