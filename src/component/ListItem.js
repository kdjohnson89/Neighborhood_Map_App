import React, { Component } from 'react';

//generates item details for Sidebar

export default class ListItem extends Component {
    render() {
        return (
            <li
                className="list-item"
                onClick={() => this.props.listItemClick(this.props)}
								tabIndex="0"
								role="link"
            >
                <img
                    src={
                        this.props.categories[0].icon.prefix
                        + "32" +
                        this.props.categories[0].icon.suffix
                    }
                    alt={this.props.categories[0].name}
                />
                {this.props.name}
            </li>
        )
    }
}


