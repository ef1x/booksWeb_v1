//controller
define(['require',
        'exports',
        'module',
        'EventBus',
        'Layout',
        'views/ScannerView',
        'views/SearchView',
        'views/BookCollection',
        'views/BookListView'
    ],
    function(require, exports, module, EventBus, Layout) {
        var ScannerView = require('views/ScannerView');
        var SearchView = require('views/SearchView');
        var BookCollection = require('views/BookCollection');
        var BookListView = require('views/BookListView');

        function SearchController() {

            this.books = new BookCollection();

            // set routes aka handle events
            EventBus.on('search:show', _show.bind(this));
            EventBus.on('search:scanner', _showScanner.bind(this));
            EventBus.on('search:byphrase', _searchByPhrase.bind(this));
        }

        // NavigationController.prototype = Object.create();
        SearchController.prototype.constructor = SearchController;

        /*
         Show the formular for search
         */
        function _show() {
            if (typeof(this.searchView) == 'undefined')
                this.searchView = new SearchView();

            Layout.show(this.searchView);
            EventBus.emit('changename', 'Search');
        }

        /*
         Show the formular for search
         */
        function _showScanner() {
            if (typeof(this.scannerView) == 'undefined')
                this.scannerView = new ScannerView();

            Layout.show(this.scannerView);
            console.log('läuft');
        }

        /*
         *   Search with Phrase
         *
         */

        function _searchByPhrase(search) {
            var bookCollection = this.books.getByPhrase(search.phrase);

            this.listView = new BookListView(bookCollection);

            Layout.show(this.listView);
            EventBus.emit('changename', 'Searchresult');
        }

        module.exports = SearchController;
    });
