/**
 * Created by David on 24.08.14.
 */
//ListView view
define(['require',
        'exports',
        'module',
        'EventBus',
        'Layout',
        'famous/core/View',
        'famous/views/SequentialLayout',
        'views/FavoritListItemView',
        'famous/views/Scrollview'
    ],
    function(require, exports, module, EventBus, Layout) {
        var View = require('famous/core/View');
        var SequentialLayout = require('famous/views/SequentialLayout');
        var FavoritListItemView = require('views/FavoritListItemView');
        var Scrollview = require('famous/views/Scrollview');
        var Surface = require('famous/core/Surface');
        var Modifier = require('famous/core/Modifier');
        var Transform = require('famous/core/Transform');

        function FavoritListView(FavoritCollection) {
            View.apply(this, arguments);
            //console.log(FavoritCollection);
            var listSurfaces = [];

            var listScrollview = new Scrollview({
                direction: 1,
                paginated: true,
                speedLimit: 2.5,
                edgeGrip: 0.05

            });
            listScrollview.sequenceFrom(listSurfaces);
            //console.log(FavoritCollection.length);
            $.each(FavoritCollection, function(i, favorit) {

                var FavoritListItem = new FavoritListItemView(favorit);
                FavoritListItem.pipe(listScrollview);
                listSurfaces.push(FavoritListItem);

            });
            console.log(listSurfaces);
            var listScrollMod = new Modifier({
                size: [window.innerWidth, window.innerHeight]
            });
            this._add(listScrollMod).add(listScrollview);

        }

        FavoritListView.prototype = Object.create(View.prototype);
        FavoritListView.prototype.constructor = FavoritListView;

        FavoritListView.DEFAULT_OPTIONS = {
            listItemHeight: 77,
            height: null
        };

        module.exports = FavoritListView;
    });
