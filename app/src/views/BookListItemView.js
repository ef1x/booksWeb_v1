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

        function BookListItemView(Book) {
            //console.log(Book);
            View.apply(this, arguments);
            //console.log(Book.getThumbnail());
            var thumbnail = Book.getThumbnail();
            console.log('blobURL' + thumbnail);

//            content = '<div class="list-item">';
            //content += '<img class="list-icon" width="30" src="' + Book.getThumbnail() + '" />';
            content = '<div class="thumbnailContainer"><img src="data:image/*;base64,' + thumbnail +' "/></div>';
            content += '<div class="bookAttributs">';
            content += '<div class="bookTitle">' + Book.getTitle() + '</div>';
            content += '<div class="bookAuthors">' + Book.getAuthors() + '</div>';
            content += '<div class="bookIdentifier">' + Book.getIdentifier() + '</div></div>';
//            content += '</div>';


            var surface = new Surface({
                size: [undefined, this.options.listItemHeight],
                content: content,
                classes: ['listItem'],
                properties: {
                    color: 'black',
                    borderBottom: '1px solid lightgrey'
                }

            });


//
            surface.pipe(this._eventOutput);
            this.add(surface);

            surface.on('click', function() {
                EventBus.emit('book:show', Book);
            });
//
        }

        BookListItemView.prototype = Object.create(View.prototype);
        BookListItemView.prototype.constructor = BookListItemView;

        BookListItemView.DEFAULT_OPTIONS = {
            listItemHeight: 100
        };

        module.exports = BookListItemView;
    });
