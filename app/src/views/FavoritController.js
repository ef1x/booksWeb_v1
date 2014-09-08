/**
 * Created by David on 24.08.14.
 */
define(['require',
        'exports',
        'module',
        'EventBus',
        'Layout',
        'views/FavoritListView',
        'views/FavoritCollection',
        'views/FavoritView',
    ],
    function(require, exports, module, EventBus, Layout) {
        var FavoritListView = require('views/FavoritListView');
        var FavoritCollection = require('views/FavoritCollection');
        var FavoritView = require('views/FavoritView');
        var HeaderView = require('views/HeaderView');
//
        function FavoritController() {

            this.favorit = new FavoritCollection();

            // set routes aka handle events
            EventBus.on('favorites:loadData', _loadData.bind(this));
            EventBus.on('bookView:markAsFavorite', _setFavorites.bind(this));
            EventBus.on('favorit:deleteFavorite', _deleteFavorites.bind(this));
            EventBus.on('Favorit:show', _showFavorit.bind(this));

        }

        FavoritController.prototype.constructor = FavoritController;

        /*
         load data from db to show in ListView
         */
        function _loadData() {
            this.favorit.getFavorites().then(function(response) {
                console.log(response);
                EventBus.on('favorites:show', _showListView(response).bind(this));
            });

        }

        function _showListView(favoritCollection) {

            this.listView = new FavoritListView(favoritCollection);

            Layout.show(this.listView);
            EventBus.emit('changename', 'Favorites');
        }

        function _showFavorit(favorit) {
            console.log(favorit);

            var favoritView = new FavoritView(favorit);
            EventBus.emit('changename', 'FavoriteDetailActivity');
            Layout.show(favoritView);

        }

        function _setFavorites(book) {
            this.favorit.setFavorites(book);
            console.log(book);
        }

        function _deleteFavorites(Favorit) {
            this.favorit.deleteFavorites(Favorit);
        }

        module.exports = FavoritController;
    });
