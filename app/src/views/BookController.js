define(['require',
        'exports',
        'module',
        'EventBus',
        'Layout',
        'views/BookView'
    ],
    function(require, exports, module, EventBus, Layout) {
        var BookView = require('views/BookView');

        function BookController() {

            // set routes aka handle events
            EventBus.on('book:show', _show.bind(this));
        }

        // NavigationController.prototype = Object.create();
        BookController.prototype.constructor = BookController;

        /*
         Show the formular for search
         */
        function _show(book) {
            console.log(book);
            var bookView = new BookView(book);
            Layout.show(bookView);
            EventBus.emit('changename', 'DetailView');
        }

        module.exports = BookController;
    });
