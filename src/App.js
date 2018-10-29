import React, { Component } from 'react';
import './App.css';
import Map from './component/Map';
import Sidebar from './component/Sidebar';
import SquareAPI from './API/';
import ErrorBoundary from './component/ErrorBoundary';


class App extends Component {
	
	constructor() {
		super();
		this.state = {
			venues: [],
			markers: [],
			center: [],
			zoom: 12,
		updateSuperState: obj => {
			this.setState(obj);
		}
		};
	}
	closeMarkers = () => {
		const markers = this.state.markers.map(marker => {
																			 marker.isOpen = false
																			 return marker;
																			 })
		this.setState({ markers: Object.assign(this.state.markers, markers) });
	};
	
	markerClick = (marker) => {
		this.closeMarkers();
		marker.isOpen = true;
		this.setState({ markers: Object.assign(this.state.markers, marker) });
		const venue = this.state.venues.find(venue => venue.id === marker.id);
		
		SquareAPI.getVenueDetails(marker.id).then(res => {
																							const newVenue = Object.assign(venue, res.response.venue);
																							this.setState({ venues: Object.assign(this.state.venues, newVenue) });
																							console.log(newVenue);
																							});
	};
	
	listItemClick = venue => {
		const marker = this.state.markers.find(marker => marker.id === venue.id);
		this.markerClick(marker);
	};
	//Set and retrieve FourSquare information
	componentDidMount() {
		SquareAPI.search({
										 near: "Austin, TX 78729",
										 query: "beer"
										 }).then(results => {
														 const { venues } = results.response;
														 const { center } = results.response.geocode.feature.geometry;
														 const markers = venues.map(venue => {
																														return {
																															lat: venue.location.lat,
																															lng: venue.location.lng,
																															isOpen: false,
																															isVisible: true,
																															id: venue.id
																															};
																													});
														 this.setState({ venues, center, markers });
														 console.log(results);
														 }).catch(error => {
																			alert('FourSquare API has failed. Please reload.');
																			console.log(error);
																			})
	}
  render() {
    return (
		<main>
      <div className="App">
						<ErrorBoundary>
						<Sidebar {...this.state} listItemClick={this.listItemClick} />
						<Map {...this.state} markerClick={this.markerClick} />
						</ErrorBoundary>
      </div>
		</main>
    );
  }
}

export default App;
