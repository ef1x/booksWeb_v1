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
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var FormContainerSurface = require('famous/surfaces/FormContainerSurface');
    var InputSurface = require('famous/surfaces/InputSurface');
    var SubmitInputSurface = require('famous/surfaces/SubmitInputSurface');
    var FlexibleLayout = require('famous/views/FlexibleLayout');

    function BookView(Book) {
        View.apply(this, arguments);

        this.Book = Book;

        var ratios = [3, 1, 1];

        var layout = new FlexibleLayout({
            direction: 1,
            ratios: ratios
        });

        var surfaces = [];



        content = '<div class="book-item">';
        content += '<div id="thumbnailContainer'+ this.Book.getId() +'"><img src="'+ Book.getblobURL() +'"/></div>';
        content += '<div class="book-title">' + this.Book.getTitle() + '</div>';
        content += '<div class="book-authors">' + this.Book.getAuthors() + '</div>';
        content += '<div class="book-identifier">' + this.Book.getIdentifier() + '</div>';
        content += '<div class="book-description">' + this.Book.getDescription() + '</div>';
        content += '</div>';

        var bookInfo = new Surface({
            size: [undefined, undefined],
            content: content,
            properties: {

                color: 'black',
                borderBottom: '1px solid lightgrey'
            }

        });
        var addFav = new SubmitInputSurface({
            classes: ['submitFavorit'],
            //origin: [0, 0],
            size: [40 , 40]
        });

        var showMap = new SubmitInputSurface({
            classes:['mapButton'],
           // origin: [0, 0],
            size: [40, 40]
        });

        addFav.on('click', this.writeToDatabase.bind(this));
        showMap.on('click', this.showMap.bind(this));

        surfaces.push(bookInfo);
        surfaces.push(addFav);
        surfaces.push(showMap);

        layout.sequenceFrom(surfaces);

        this.add(layout);
    }

    BookView.prototype = Object.create(View.prototype);
    BookView.prototype.constructor = BookView;

    BookView.DEFAULT_OPTIONS = {};

    BookView.prototype.writeToDatabase = function() {
        //console.log(this.blobURL);
        EventBus.emit('bookView:markAsFavorite', this.Book);
        //console.log(this.Book);
        console.log('emit markAsFavorite');
    };
    BookView.prototype.showMap = function() {
        EventBus.emit('maps:show');
    };

    module.exports = BookView;
});
