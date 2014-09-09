/**
 * Created by David on 24.08.14.
 */
define(function(require, exports, module) {
    function FavoritModel(favorit) {
        console.log(favorit);
        this.id = favorit.key;
        var volumeInfo = favorit.value;
        //console.log(volumeInfo);
        this.title = volumeInfo.title ? volumeInfo.title : '';
        this.authors = volumeInfo.authors ? volumeInfo.authors : '';
        this.identifier = volumeInfo.identifier ? volumeInfo.identifier : '';
        this.description = volumeInfo.description ? volumeInfo.description : '';
        this.thumbnail = volumeInfo.thumbnail ? volumeInfo.thumbnail : '';

        //this.identifier = volumeInfo.industryIdentifiers[0].identifier ? volumeInfo.industryIdentifiers[0].identifier :'';
        //this.description = volumeInfo.description ? volumeInfo.description :'';

//        if (typeof(volumeInfo.imageLinks) !== 'undefined')
//        {
//            this.imageLinks = volumeInfo.imageLinks;
//        }
//        else
//            this.imageLinks = undefined;
    }

    FavoritModel.prototype.constructor = FavoritModel;

    FavoritModel.prototype.getTitle = function() {
        return this.title;
    };

    FavoritModel.prototype.getAuthors = function() {
        return this.authors;
    };

    FavoritModel.prototype.getIdentifier = function() {
        return this.identifier;
    };
    FavoritModel.prototype.getDescription = function() {
        return this.description;
    };

    FavoritModel.prototype.getThumbnailUrl = function() {
        return this.thumbnail;
    };

    module.exports = FavoritModel;
});
