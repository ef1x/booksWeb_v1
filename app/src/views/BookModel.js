define(function(require, exports, module) {

    function BookModel(book) {

        //this.id = book.Objects;
        //console.log(this.id);
        var volumeInfo = book.volumeInfo;
        this.imgURL = '';
        if (typeof(volumeInfo.imageLinks) !== 'undefined') {
            imageLinks = volumeInfo.imageLinks;


            if (typeof(imageLinks.smallThumbnail) !== 'undefined')
                this.imgURL = imageLinks.smallThumbnail;

            if (typeof(imageLinks.thumbnail) !== 'undefined')
                this.imgURL = imageLinks.thumbnail;

            if (typeof(imageLinks.small) !== 'undefined')
                this.imgURL = imageLinks.small;

            if (typeof(imageLinks.medium) !== 'undefined')
                this.imgURL = imageLinks.medium;

//            this.image = loadImg(imgURL).then(function(response) {});
            //this.image = loadImgWorker(imgURL);

        }
        this.id = volumeInfo.industryIdentifiers[0].identifier ? volumeInfo.industryIdentifiers[0].identifier : '';
        this.title = volumeInfo.title ? volumeInfo.title : '';
        this.authors = volumeInfo.authors ? volumeInfo.authors : '';
        this.identifier = volumeInfo.industryIdentifiers[0].identifier ? volumeInfo.industryIdentifiers[0].identifier : '';
        this.description = volumeInfo.description ? volumeInfo.description : '';
        this.blobURL = '';


    }

    BookModel.prototype.constructor = BookModel;

    BookModel.prototype.getId = function() {

        return this.id;
    };

    BookModel.prototype.getTitle = function() {
        return this.title;
    };

    BookModel.prototype.getAuthors = function() {
        return this.authors;
    };

    BookModel.prototype.getIdentifier = function() {
        return this.identifier;
    };
    BookModel.prototype.getDescription = function() {
        return this.description;
    };

    BookModel.prototype.getThumbnail = function() {
        var imgURL = this.imgURL;
        var id  = this.id;
        var that = this;

        //return new Promise(function (resolve, reject) {

            //BlobBuilder = window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder;
            console.log(imgURL);
            var xhr = new XMLHttpRequest();
            xhr.open('GET', imgURL, true);
            xhr.responseType = 'arraybuffer';
            xhr.send();

            xhr.onloadend = function (e) {
                if (this.status == 200) {
                    //BlobBuilder = window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder;
                    var blob = new Blob([this.response], {type: 'image/png'});
//                    bb.append(this.response); // Note: not xhr.responseText

                    var urlCreator = window.URL || window.webkitURL;
                    that.blobImgURL = urlCreator.createObjectURL(blob);

//                    var blob = bb.getBlob('image/png');
//                    console.log('blob: ' + blob);
//                    console.log('bloburl: ' + blobImgURL);
//                    console.log('.thumbnailContainer'+id);
                    $('#thumbnailContainer'+id).append('<img src="' + that.blobImgURL +' "/>');
                    var blobURL = that.blobImgURL;

                }

                //resolve(blobImgURL);
            };
    };

    BookModel.prototype.getblobURL = function() {
        console.log(this.blobImgURL);
        return this.blobImgURL;
    };


    module.exports = BookModel;
});
