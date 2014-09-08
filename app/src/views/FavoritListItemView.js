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
        'famous/surfaces/ImageSurface',
        'famous/views/GridLayout',
        'famous/modifiers/StateModifier'
    ],
    function(require, exports, module, Layout, EventBus) {
        var View = require('famous/core/View');
        var Surface = require('famous/core/Surface');
        var ImageSurface = require('famous/surfaces/ImageSurface');
        var StateModifier = require('famous/modifiers/StateModifier');
        var GridLayout = require('famous/views/GridLayout');

        function FavoritListItemView(Favorit) {
            //console.log(Favorit);
            View.apply(this, arguments);

            content =  '<div class="thumbnailContainer"><img  src="' + Favorit.getThumbnailUrl() + '"/></div>';
            content += '<div class="bookAttributs">';
            content += '<div class="bookTitle">' + Favorit.getTitle() + '</div>';
            content += '<div class="bookAuthors">' + Favorit.getAuthors() + '</div>';
            content += '<div class="bookIdentifier">' + Favorit.getIdentifier() + '</div></div>';

            var surface = new Surface({
                size: [undefined, this.options.listItemHeight],
                content: content,
                classes: ['listItem'],
                properties: {

                    color: 'black',
                    borderBottom: '1px solid lightgrey'
                }

            });
            surface.pipe(this._eventOutput);
            this.add(surface);

            surface.on('click', function() {
                EventBus.emit('Favorit:show', Favorit);
            });
        }

        FavoritListItemView.prototype = Object.create(View.prototype);
        FavoritListItemView.prototype.constructor = FavoritListItemView;

        FavoritListItemView.DEFAULT_OPTIONS = {
            listItemHeight: 100
        };

        module.exports = FavoritListItemView;
    });
