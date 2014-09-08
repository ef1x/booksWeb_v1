define(['require',
        'exports',
        'module',
        'EventBus',
        'Layout',
        'views/SearchView',
        'views/BookCollection',
        'views/BookListView',
        'views/googleMapView'
    ],
    function(require, exports, module, EventBus, Layout) {
        var SearchView = require('views/SearchView');
        var BookCollection = require('views/BookCollection');
        var BookListView = require('views/BookListView');
        var googleMapView = require('views/googleMapView');

        function MapController() {

            // set routes aka handle events
            EventBus.on('maps:show', _show.bind(this));

        }

        // NavigationController.prototype = Object.create();
        MapController.prototype.constructor = MapController;

        /*
         Show the formular for search
         */
        function _show() {
            if (typeof(this.MapView) == 'undefined')
                this.MapView = new googleMapView();
            EventBus.emit('changename', 'Next Library');
            Layout.show(this.MapView);
        }

        module.exports = MapController;
    });
