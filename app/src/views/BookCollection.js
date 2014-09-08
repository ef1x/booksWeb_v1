//
define(function(require, exports, module) {
    var Book = require('views/BookModel');

    function BookCollection() {
        // setup google api
        this.api = 'https://www.googleapis.com/books/v1/volumes';
    }

    BookCollection.prototype.constructor = BookCollection;

    BookCollection.prototype.getByPhrase = function(phrase) {

        var collection = [];
        $.ajax({
            url: this.api + '?q=' + phrase + '&key=AIzaSyDjL9mTvbGiaHH8BxUDflfpOUJG6Cu2uVE&fields=kind,totalItems,items(volumeInfo(title,authors,description,imageLinks,industryIdentifiers))&maxResults=40',
            dataType: 'json',
            async: false,
            success: function(data) {
                console.log(data);
                $.each(data.items, function(i, item) {
                    collection.push(new Book(item));
                });
            }
        });
        return collection;
    };
    BookCollection.prototype.getByISBN = function(isbn) {

        var collection = [];

        $.ajax({
            url: this.api + phrase + '&key=AIzaSyDjL9mTvbGiaHH8BxUDflfpOUJG6Cu2uVE&fields=kind,totalItems,items(volumeInfo(title,authors,description,imageLinks,industryIdentifiers))&maxResults=40',
            dataType: 'json',
            async: false,
            success: function(data) {
                $.each(data.items, function(i, item) {
                    collection.push(new Book(item));
                });
            }
        });

        return collection;
    };

    module.exports = BookCollection;
});
