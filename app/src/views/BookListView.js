//ListView view
define(['require',
        'exports',
        'module',
        'EventBus',
        'famous/core/View',
        'famous/views/SequentialLayout',
        'views/BookListItemView',
        'famous/views/Scrollview'
    ],
    function(require, exports, module, EventBus) {
        var View = require('famous/core/View');
        var SequentialLayout = require('famous/views/SequentialLayout');
        var BookListItemView = require('views/BookListItemView');
        var Scrollview = require('famous/views/Scrollview');
        var Surface = require('famous/core/Surface');
        var Modifier = require('famous/core/Modifier');
        var Transform = require('famous/core/Transform');

        function BookListView(BookCollection) {
            View.apply(this, arguments);
            console.log(BookCollection);
            var listSurfaces = [];

            var listScrollview = new Scrollview({
                speedLimit: 2.5,
                edgeGrip: 0.05
            });
            listScrollview.sequenceFrom(listSurfaces);

            $.each(BookCollection, function(i, book) {

                var bookListItem = new BookListItemView(book);
                bookListItem.pipe(listScrollview);
                listSurfaces.push(bookListItem);

            });
            console.log(listSurfaces);
            var listScrollMod = new Modifier({
                size: [window.innerWidth, window.innerHeight ]
            });
            this._add(listScrollMod).add(listScrollview);
        }

        BookListView.prototype = Object.create(View.prototype);
        BookListView.prototype.constructor = BookListView;

        BookListView.DEFAULT_OPTIONS = {
            listItemHeight: 77,
            height: null
        };

        module.exports = BookListView;
    });
