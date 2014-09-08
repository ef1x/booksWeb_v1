define(function(require, exports, module) {



    function BookModel(book) {

        this.id = book.id;
        var volumeInfo = book.volumeInfo;
        this.title = volumeInfo.title ? volumeInfo.title : '';
        this.authors = volumeInfo.authors ? volumeInfo.authors : '';
        this.identifier = volumeInfo.industryIdentifiers[0].identifier ? volumeInfo.industryIdentifiers[0].identifier : '';
        this.description = volumeInfo.description ? volumeInfo.description : '';

        if (typeof(volumeInfo.imageLinks) !== 'undefined') {
            imageLinks = volumeInfo.imageLinks;
            var imgURL;

            if (typeof(imageLinks.smallThumbnail) !== 'undefined')
                imgURL = imageLinks.smallThumbnail;

            if (typeof(imageLinks.thumbnail) !== 'undefined')
                imgURL = imageLinks.thumbnail;

            if (typeof(imageLinks.small) !== 'undefined')
                imgURL = imageLinks.small;

            if (typeof(imageLinks.medium) !== 'undefined')
                imgURL = imageLinks.medium;

            this.image = loadImg(imgURL);



        }

        function loadImg(imgURL) {
            console.log(imgURL);
            var blobImgURL;

            //BlobBuilder = window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder;

            var xhr = new XMLHttpRequest();
            xhr.open('GET', imgURL, true);
            xhr.responseType = 'arraybuffer';

            xhr.onload = function(e) {
                if (this.status == 200) {
                    //BlobBuilder = window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder;
                    var blob = new Blob([this.response], {type: 'image/png'});
//                    bb.append(this.response); // Note: not xhr.responseText

                    var urlCreator = window.URL || window.webkitURL;
                blobImgURL = urlCreator.createObjectURL(blob);

//                    var blob = bb.getBlob('image/png');
                    console.log('blob: ' + blob);
                    console.log('bloburl: ' + blobImgURL);
                    return blobImgURL
                }
            };

            xhr.send();


//                    var blob = bb.getBlob('image/png');
//                    console.log(blob);
//                    var urlCreator = window.URL || window.webkitURL;
//                blobImgURL = urlCreator.createObjectURL(blob);
//                console.log(blobImgURL);




//            var xhr = new XMLHttpRequest();
//            xhr.open('GET', imgURL, true);
//            xhr.responseType = 'blob';
//            xhr.onload = function(e) {
//                console.log(e);
//                console.log(typeof(e));
//                var blob = e;

//                var buffer = new Uint8Array(e);
//                for (var i = 0; i < buffer.length; i++) {
//                    buffer[i] = data.charCodeAt(i);
//                }
//                console.log(buffer);
//                var blob = new Blob([buffer], {type: 'image/jpeg'});
                //blobImgURL = window.URL.createObjectURL(blob);
//                console.log(blob);
//                var urlCreator = window.URL || window.webkitURL;
//                blobImgURL = urlCreator.createObjectURL(blob);
//                console.log(blobImgURL);
//            };
//            xhr.send();

//            $.ajax({
//                url: imgURL,
//                dataType: 'arraybuffer',
//
//                async: false,
//                success: function(data) {
//                    console.log(data);
//                    console.log(typeof (data));
//
//
////                    var binStr = data;
////                    for (var i = 0, len = binStr.length; i < len; ++i) {
////                        var c = binStr.charCodeAt(i);
////                        //String.fromCharCode(c & 0xff);
////                        var byte = c & 0xff;  // byte at offset i
////                    }
////                    console.log('byte:' + typeof(byte));
//
//                    var blob = new Blob(enc, {type: 'image/jpeg'});
//                    var urlCreator = window.webkitURL || window.URL;
//                    blobImgURL = urlCreator.createObjectURL(blob);


//                }
//            });


        }
    }

    BookModel.prototype.constructor = BookModel;

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

        if (typeof(this.image) == 'undefined') {
            var img = document.createElement('img');
            img.src = 'img/hamburger.png';
            return img;
        }
        console.log(this.image);
        return this.image;

    };

    module.exports = BookModel;
});
