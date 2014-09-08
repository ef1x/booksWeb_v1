//Manage database connection to indexedDB
define(['require',
        'exports',
        'module',
        'EventBus',
        'views/FavoritModel'
    ],
    function(require, exports, module, EventBus) {

        var Favorit = require('views/FavoritModel');

        const DB_NAME = 'MyBooks';
        const DB_VERSION = 1; //don't use a float
        const DB_STORE_NAME = 'FavoritBooks';

        function FavoritCollection() {
            if (!window.indexedDB) {
                window.alert('Your browser do not support a stable version of IndexedDB. Such and such feature will not be available.');
            }
            else {

                // open our database
                // returns an IDBOpenDBRequest object with a result (success) or error value
                // second parameter is the version of the database.
                var request = window.indexedDB.open(DB_NAME, DB_VERSION);

                request.onerror = function(event) {
                    // Generic error handler for all errors targeted at this database's
                    alert('Database error: ' + event.target.errorCode);
                };
                request.onsuccess = function(event) {
                    // Do something with request.result!
                    console.log('congrats, your database connection is established');
                    db = request.result;
                    EventBus.emit('favorites:loadData');
                };
                request.onupgradeneeded = function(event) {
                    console.log('Upgrading db');
                    var db = event.target.result;

                    // Create an objectStore to hold information about our customers. We're
                    // going to use 'ssn' as our key path because it's guaranteed to be
                    // unique - or at least that's what I was told during the kickoff meeting.
                    var objectStore = db.createObjectStore(DB_STORE_NAME, { autoIncrement: true });

                    // Create an index to search customers by name. We may have duplicates
                    //objectStore.createIndex('id', 'id', { unique: false });
                    objectStore.createIndex('title', 'title', { unique: false });
                    objectStore.createIndex('authors', 'authors', { unique: false });
                    objectStore.createIndex('identifier', 'identifier', { unique: true });
                    objectStore.createIndex('description', 'description', { unique: false });
                    objectStore.createIndex('thumbnail', 'thumbnail', { unique: false });

                    // Use transaction oncomplete to make sure the objectStore creation is
                    // finished before adding data into it.
                    objectStore.transaction.oncomplete = function(event) {

                    }
                };

            }
        }

        FavoritCollection.prototype.constructor = FavoritCollection;

        FavoritCollection.prototype.getFavorites = function() {

            return new Promise(function(resolve, reject) {
                var collection = [];

                //get objectStore
                var objectStore = db.transaction('FavoritBooks').objectStore('FavoritBooks');
                //use curser to iterate thrugh objectstore
                objectStore.openCursor().onsuccess = function(event) {
                    var cursor = event.target.result;

                    if (cursor) {
                        //alert(cursor.value.authors);
                        //console.log(cursor);
                        collection.push(new Favorit(cursor));

                        cursor.continue();
                    }
                    else {
                        console.log('No more entries!');
                        if (collection != null) {

                            resolve(collection);
                        } else {
                            //erste view anzeigen, wenn noch keine werte in der DB sind
                            //collection.push(Favorit(empty));
                            alert('else');
                        }

                    }
                    //console.log(collection);

                };

                // Handle errors
                objectStore.openCursor().onerror = function(event) {

                    console.log('zugriffsfehler');
                    reject('fuck');
                };
                EventBus.emit('favorites:show');
            });

        };

        FavoritCollection.prototype.setFavorites = function(book) {
            console.log(book);

            var storeObject = { title: book.getTitle(), authors: book.getAuthors(), identifier: book.getIdentifier(), description: book.getDescription(), thumbnail: book.getThumbnail()};

            // Store values in the newly created objectStore.
            var FavoritObjectStore = db.transaction(DB_STORE_NAME, 'readwrite');
            FavoritObjectStore.objectStore(DB_STORE_NAME).add(storeObject);
            FavoritObjectStore.oncomplete = function(event) {
                console.log('record');
                EventBus.emit('favorites:load');
            };

        };

        FavoritCollection.prototype.deleteFavorites = function(favorit) {

            var FavoritObjectStore = db.transaction(DB_STORE_NAME, 'readwrite');
            FavoritObjectStore.objectStore(DB_STORE_NAME).delete(favorit.id);

            FavoritObjectStore.oncomplete = function(event) {
                console.log('record deleted');
                EventBus.emit('favorites:loadData');
            };

        };

        module.exports = FavoritCollection;
    });
