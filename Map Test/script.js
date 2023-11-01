function initMap() {
    //21.005085, 105.844946


	// Update MAP_ID with custom map ID
	map = new google.maps.Map(document.getElementById('map'), {
		center: {
			lat: 21.005085,
			lng: 105.844946,
		},
		zoom: 17,
		mapId: 'b829fdf5fd787f5',
		mapTypeControl: false,
		fullscreenControl: false,
		streetViewControl: false,
	});
	// Name
	// Latitude, Longitude
	// Image URL
	// scaledSize width, height
	const markers = [
		[
			"Ban tap hoa voi muc gia phai chang",
			21.003000, 105.842900,
			'./market.png',
			55,
			55,
		],
		[
			'Tap hoa tien loi',
            21.003099, 105.841999,
			'./store.png',
			55,
			55,

		],
        [
			'...!',
            21.006099, 105.841999,
			'./cstore.png',
			55,
			55,

		],
        [
			'Tap hoa tien loi',
            21.008099, 105.850999,
			'./store.png',
			55,
			55,

		],
        [
			'Tap hoa tien loi',
            21.001099, 105.831999,
			'./cstore.png',
			55,
			55,

		],
        [
			'Tap hoa tien loi',
            21.004099, 105.941999,
			'./market.png',
			55,
			55,
		],
	];

	for (let i = 0; i < markers.length; i++) {
		const currMarker = markers[i];

		const marker = new google.maps.Marker({
			position: { lat: currMarker[1], lng: currMarker[2] },
			map,
			title: currMarker[0],
			icon: {
				url: currMarker[3],
				scaledSize: new google.maps.Size(currMarker[4], currMarker[5]),
			},
			animation: google.maps.Animation.DROP,
		});

		const infowindow = new google.maps.InfoWindow({
			content: currMarker[0],
		});

		marker.addListener('click', () => {
			infowindow.open(map, marker);
		});
	}
}