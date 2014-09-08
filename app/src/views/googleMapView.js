define(['require',
    'exports',
    'module',
    'Layout',
    'EventBus',
    'famous/core/View',
    'famous/core/Surface',
    'famous/core/Modifier',
    'famous-map/MapView',
    'famous-map/MapModifier',
    'famous-map/MapStateModifier'
], function(require, exports, module, Layout, EventBus) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Modifier = require('famous/core/Modifier');
    var MapView = require('famous-map/MapView');
    var MapModifier = require('famous-map/MapModifier');
    var MapStateModifier = require('famous-map/MapStateModifier');

    function googleMapView() {
        View.apply(this, arguments);

        EventBus.on('coord:loaded', _getPlaces.bind(this));
        EventBus.on('coord:loaded', _buildMap.bind(this));
        EventBus.on('places:loaded', _setMarker.bind(this));

        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 50000
        };

        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(_getCoord.bind(this), handleError, options);
        } else {
            console.log('Geolocation is not supported by this browser.');
        }
    }

    googleMapView.prototype = Object.create(View.prototype);
    googleMapView.prototype.constructor = googleMapView;

    function _getCoord(pos) {
        var crd = pos.coords;

        this.lat = crd.latitude;
        this.lng = crd.longitude;

        EventBus.emit('coord:loaded');
    }

    function _buildMap() {

        console.log(this.lat);
        var mapView = new MapView({
            type: MapView.MapType.GOOGLEMAPS,
            mapOptions: {
                zoom: 16,
                center: {lat: this.lat, lng: this.lng},
                mapTypeId: google.maps.MapTypeId.TERRAIN
            }

        });
        this.add(mapView);

        // Wait for the map to load and initialize
        mapView.on('load', function() {

            // Move across the globe and zoom-in when done
            mapView.setPosition(
                {lat: this.lat, lng: this.lng},
                { duration: 5000},
                function() {
                    mapView.getMap();
                }
            );
            var map = mapView.getMap();

            //set Marker info for your position
            var infowindow = new google.maps.InfoWindow({});

            //google set marker methode
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(this.lat, this.lng),
                title: 'you are here',
                icon: 'img/location.png',
                map: map
            });
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(this.title);
                infowindow.open(map, marker);
            });
            this.add(marker);

            /*
             //famo.us renderable
             var surface = new Surface({
             size: [10, 10],
             properties: {
             backgroundColor: 'tomato'
             }
             });
             var modifier = new Modifier({
             align: [0, 0],
             origin: [0.5, 0.5]
             });
             var mapModifier = new MapModifier({
             mapView: mapView,
             position: {lat: this.lat, lng: this.lng}
             });
             //            .add(modifier)
             this.add(mapModifier).add(surface);*/
        }.bind(this));
        this.map = mapView;
    }

    function _getPlaces() {
        var that = this;

        $.ajax({
            url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/'
                + 'json?location='
                + this.lat
                + ','
                + this.lng
                + '&radius=1000&sensor=true'
                + '&types='
                + 'book_store|library'
                + '&key=AIzaSyBt4UwId11OPjLA5jjnNuTAvJ-d-1FbAFM',
            dataType: 'json',
            type: 'GET',

            async: true,
            success: function(data) {
                that.markerInfo = data;
                EventBus.emit('places:loaded');

            },
            error: function() {
                alert('Failed!');
            }
        });

        //return places;
    }

    function _setMarker() {
        var data = this.markerInfo;
        console.log(data);
        for (var i = 0; i < data.results.length; i++) {
            //console.log(data.results[i].geometry.location.lat);

            var lat = data.results[i].geometry.location.lat;
            var lng = data.results[i].geometry.location.lng;
            var infoText = data.results[i].name;
            var map = this.map.getMap();

            /* var placesMarker = new Surface({
             size: [10, 10],
             properties: {
             backgroundColor: 'blue'
             }
             });
             //            var modifier = new Modifier({
             //                align: [0, 0],
             //                origin: [0.5, 0.5]
             //            });
             var mapModifier = new MapModifier({
             mapView: this.map,
             position: {lat: lat, lng: lng}
             });

             this.add(mapModifier).add(placesMarker);*/

            var infowindow = new google.maps.InfoWindow({});

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(lat, lng),
                icon: 'img/location_place.png',
                title: infoText,
                map: map
            });
            google.maps.event.addListener(marker, 'click', function() {
                console.log(infowindow.setContent(this.title));
                infowindow.open(map, this);
            });
            this.add(marker)

            console.log(i);
        }
    }

    function handleError(error) {
        if (error.code == 1) {
            console.log('no user permission');
        }
        if (error.code == 2) {
            console.log('position not available');
        }
        if (error.code == 3) {
            console.log('timeout');
        }
    }

    module.exports = googleMapView;

});
