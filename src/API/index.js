class Helper {
	static baseURL () {
		return "https://api.foursquare.com/v2";
	}
	//Keys for foursquare auth
	//Version required-only update after code review
	static auth() {
		const keys = {
		client_id: "G4MORCWLIUQRWOZYSOPFJMH1NATQSNAJPU3JNHUD5TUMV0JF",
		client_secret: "F4TFMN0XN3YWGY4WI54VXUC3BO3KFS1IUF4JQLM5NRUCZQTO",
		v: "20181024"
		};
		return Object.keys(keys)
		.map(key => `${key}=${keys[key]}`)
		.join("&");
	}
	static urlBuilder(urlParams) {
		if (!urlParams) {
			return "";
		}
		return Object.keys(urlParams)
		.map(key => `${key}=${urlParams[key]}`)
		.join("&");
	}
	static headers() {
		return {
		Accept: "application/json"
		};
	}
	static simpleFetch(endPoint, method, urlParams) {
		let requestData = {
			method,
			headers: Helper.headers()
		};
		return fetch(
								 `${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(
																																											urlParams
																																											)}`,
								 requestData
								 ).then(res => res.json());
	}
}
//Foursquare location info
export default class SquareAPI {
	static search(urlParams) {
		return Helper.simpleFetch("/venues/search", "GET", urlParams);
	}
	static getVenueDetails(VENUE_ID) {
		return Helper.simpleFetch(`/venues/${VENUE_ID}`, "GET");
	}
	static getVenuePhotos(VENUE_ID) {
		return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, "GET");
	}
}
