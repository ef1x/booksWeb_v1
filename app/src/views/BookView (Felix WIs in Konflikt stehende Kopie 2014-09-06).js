define(['require',
    'exports',
    'module',
    'Layout',
    'EventBus',
    'famous/core/View',
    'famous/core/Surface',
    'famous/views/FlexibleLayout',
    'famous/surfaces/SubmitInputSurface'
    ],function(require, exports, module,Layout,EventBus) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var ImageSurface       = require('famous/surfaces/ImageSurface');
    //var Database      = require('views/DatabaseManger');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var FormContainerSurface    = require('famous/surfaces/FormContainerSurface');
    var InputSurface    = require('famous/surfaces/InputSurface');
    var SubmitInputSurface    = require('famous/surfaces/SubmitInputSurface');
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
        content += '<img class="book-icon" width="30" src="' + this.Book.getThumbnailUrl() + '" />';
        content += '<div class="book-title">' + this.Book.getTitle() + '</div>';
        content += '<div class="book-authors">' + this.Book.getAuthors() + '</div>';
        content += '<div class="book-identifier">' + this.Book.getIdentifier() + '</div>';
        content += '<div class="book-description">' + this.Book.getDescription() + '</div>';
        content += '</div>';

        var bookInfo = new Surface({
            size: [undefined, undefined],
            content: content,
            properties: {
                background: 'white',
                color: 'black',
                borderBottom: '1px solid lightgrey'
            }

        });
        var addFav = new SubmitInputSurface({
            origin: [0,0],
            size: [undefined, undefined],
            value: 'add to favorit'

        });

        var showMap = new SubmitInputSurface({
            origin: [0,0],
            size: [undefined, undefined],
            value: 'show map'

        });

        addFav.on('click',this.writeToDatabase.bind(this));
        showMap.on('click',this.showMap.bind(this));

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

        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        var img = document.getElementsByClassName('book-icon');
        alert(img);
        console.log(img);
        context.drawImage(img, 0, 0 );
        var theData = context.getImageData(0, 0, img.width, img.height);
        //image = document.getElementsByClassName('book-icon');
        console.log(theData);
        EventBus.emit('bookView:markAsFavorite', this.Book, image);
        //console.log(this.Book);
        console.log('emit markAsFavorite');
    };
    BookView.prototype.showMap = function() {
        EventBus.emit('addFavorite:map');
    };

    module.exports = BookView;
});