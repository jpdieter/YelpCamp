mapboxgl.accessToken = 'pk.eyJ1IjoiamRpZXRlciIsImEiOiJjbHN3a3RlNncwbG9qMmtvc21mN3RieWEyIn0.DTtMjekaRAZ5VT0LX2GSvg';
const map = new mapboxgl.Map({
	container: 'map', // container ID
	style: 'mapbox://styles/mapbox/streets-v12', // style URL
	center: campground.geometry.coordinates, // starting position [lng, lat]
	zoom: 9, // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
.setLngLat(campground.geometry.coordinates)
.setPopup(
	new mapboxgl.Popup({offset: 25})
	.setHTML(
		`<h4>${campground.title}</h4><p>${campground.location}</p>`
	)
)
.addTo(map)
