/**
 * Created by dave on 08.09.14.
 */

    self.addEventListener('message', function (e) {
        var data = e.data;
        //console.log(e.message);
        console.log(data.url);

        var imgURL = data.url;


        var xhr = new XMLHttpRequest();
        xhr.open('GET', imgURL, true);
        xhr.responseType = 'arraybuffer';

        xhr.onload = function (e) {
            if (this.status == 200) {
                //BlobBuilder = window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder;
                var blob = new Blob([this.response], {type: 'image/png'});

                console.log('blob: ' + blob);
                postMessage('WORKER STOPPED:' + blob);
            }

        };

        xhr.send();
    });
