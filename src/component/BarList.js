import React, { Component } from 'react';
import ListItem from './ListItem';

export default class BarList extends Component {
	render() {
		return (
						<ol className="venue-list">
						{this.props.venues &&
						this.props.venues.map((venue, idx) => (
																									 <ListItem key={idx} {...venue} listItemClick={this.props.listItemClick} />
																									 ))}
						</ol>
						);
	}
	
}
