define([
        'EventBus',
        'famous/core/Engine',
        'Layout',
        'views/HeaderView',
        'views/NavigationController',
        'views/SearchController',
        'views/BookController',
        'views/MapController',
        'views/FavoritController'
        ],
    function(EventBus,Engine,Layout) {
        var mainContext = Engine.createContext();

        // Load Navigation and Header
        var HeaderView       = require('views/HeaderView');
        var header = new HeaderView();

        var NavigationController = require('views/NavigationController');
        var Navigation = new NavigationController();

        var FavoritController = require('views/FavoritController');
        var Favorit = new FavoritController();

        // load modules here:
        var SearchController = require('views/SearchController');
        var Search = new SearchController();

        var BookController = require('views/BookController');
        var Book = new BookController();

        var MapController = require('views/MapController');
        var Map = new MapController();

        mainContext.add(Layout);

        //Console log for Debugging. Make sure that event is there
        EventBus.on('search:show',function() {
            console.log('search:show');
        });

        EventBus.on('search:scanner',function() {
            console.log('search:scanner');
        });

        EventBus.on('search:byphrase',function(msg) {
            console.log('search:byphrase ' + msg.phrase);
        });

        EventBus.on('addFavorite:database',function(object) {
            console.log('addFavorite:database ', object);
        });

        EventBus.on('addFavorite:map',function() {
            console.log('addFavorite:map');
        });

        EventBus.on('maps:show',function() {
            console.log('maps:show');
        });

        EventBus.on('favorites:show',function() {
            console.log('favorites:show');
        });
});
