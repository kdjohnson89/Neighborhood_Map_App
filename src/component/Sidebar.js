import React, { Component } from 'react';
import BarList from './BarList';

export default class Sidebar extends Component {
	constructor() {
		super();
		this.state = {
		query: "",
		venues: []
		};
	}
	
	handleFilterBars = () => {
		if (this.state.query.trim() !== "") {
			const venues = this.props.venues.filter(venue => venue.name
																							.toLowerCase()
																							.includes(this.state.query.toLowerCase())
																							);
			return venues;
		}
		return this.props.venues;
	};
	
	handleChange = e => {
		this.setState({ query: e.target.value });
		const markers = this.props.venues.map(venue => {
																					const isMatched = venue.name
																					.toLowerCase()
																					.includes(e.target.value.toLowerCase());
																					const marker = this.props.markers.find(marker => marker.id === venue.id);
																					if (isMatched) {
																					marker.isVisible = true;
																					}
																					else {
																					marker.isVisible = false;
																					}
																					return marker;
																		});
		this.props.updateSuperState({ markers })
	};

	render() {
		return (
						<div className="sidebar">
						<header><b>Find your favorite place to grab a cold one!</b></header>
							<input type={"search"}
										 id={"search"}
										 aria-label={"search"}
										 placeholder={"Filter Venues"}
										 onChange={this.handleChange} />
							 <BarList {...this.props} venues={this.handleFilterBars()} listItemClick={this.props.listItemClick} />
							<div className="powered-by">
								<footer>
									<p>*Powered by Google and FourSquare</p>
								</footer>
							</div>
						</div>
		);
	}
}


