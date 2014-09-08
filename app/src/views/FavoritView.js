/**
 * Created by David on 24.08.14.
 */
define(['require',
    'exports',
    'module',
    'Layout',
    'EventBus',
    'famous/core/View',
    'famous/core/Surface',
    'famous/views/FlexibleLayout',
    'famous/surfaces/SubmitInputSurface'
], function(require, exports, module, Layout, EventBus) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    //var Database      = require('views/DatabaseManger');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var FormContainerSurface = require('famous/surfaces/FormContainerSurface');
    var InputSurface = require('famous/surfaces/InputSurface');
    var SubmitInputSurface = require('famous/surfaces/SubmitInputSurface');
    var FlexibleLayout = require('famous/views/FlexibleLayout');

    function FavoritView(Favorit) {
        View.apply(this, arguments);

        this.Favorit = Favorit;
        var ratios = [3, 1, 1];

        var layout = new FlexibleLayout({
            direction: 1,
            ratios: ratios
        });

        var surfaces = [];

        content = '<div class="favorit-item">';
        content += '<img class="favorit-icon" width="30" src="' + Favorit.getThumbnailUrl() + '" />';
        content += '<div class="favorit-title">' + Favorit.getTitle() + '</div>';
        content += '<div class="favorit-authors">' + Favorit.getAuthors() + '</div>';
        content += '<div class="favorit-identifier">' + Favorit.getIdentifier() + '</div>';
        content += '<div class="favorit-description">' + Favorit.getDescription() + '</div>';
        content += '</div>';

        var favoritInfo = new Surface({
            size: [undefined, undefined],
            content: content,
            properties: {
                color: 'black',
                borderBottom: '1px solid lightgrey'
            }

        });

        var deleteFav = new SubmitInputSurface({
            classes: ['deleteFavorit'],
            size: [40, 40],
        });

        var showMap = new SubmitInputSurface({
            classes: ['mapButton'],
            size: [40, 40],
        });

        deleteFav.on('click', this.deleteFromDatabase.bind(this));
        showMap.on('click', this.showMap.bind(this));

        surfaces.push(favoritInfo);
        surfaces.push(deleteFav);
        surfaces.push(showMap);

        layout.sequenceFrom(surfaces);

        this.add(layout);
    }

    FavoritView.prototype = Object.create(View.prototype);
    FavoritView.prototype.constructor = FavoritView;

    FavoritView.DEFAULT_OPTIONS = {};

    FavoritView.prototype.deleteFromDatabase = function() {
        console.log(this.Favorit);
        EventBus.emit('favorit:deleteFavorite', this.Favorit);
    };
    FavoritView.prototype.showMap = function() {
        EventBus.emit('maps:show');
    };

    module.exports = FavoritView;
});
