define([
        'require',
        'exports',
        'module',
        'EventBus',
        'famous/core/View',
        'famous/core/Surface'
    ],
    function(require, exports, module, EventBus) {
        var View = require('famous/core/View');
        var Surface = require('famous/core/Surface');
        var SubmitInputSurface = require('famous/surfaces/SubmitInputSurface');

        function ScannerView() {
            View.apply(this, arguments);

            string = '<div>test</div>';
            //string += '<p><input type=button value='&#x1F4F7;' onclick='snapshot()'>';
            string += '<video> id="video" width="300" height="300"></video>';
            string += '<canvas id="canvas"></canvas>';
            string += '<div id="photo"></div>';

            this.search = new Surface({
                content: string,
                size: [300, 40]

            });

            this.photo = new SubmitInputSurface({
                size: [300, 40],
                value: 'photo'
            });

            this.add(this.search);
            this.add(this.photo);

            this.photo.on('click', function(ev) {
                takepicture();
                ev.preventDefault();
            });
        }

        function takepicture() {
            canvas.width = 300;
            canvas.height = 300;
            canvas.getContext('2d').drawImage(video, 0, 0, width, height);
            var data = canvas.toDataURL('image/png');
            photo.setAttribute('src', data);
        }

        MediaStreamTrack.getSources(function(sourceInfos) {
            var audioSource = null;
            var videoSource = null;

            for (var i = 0; i != sourceInfos.length; ++i) {
                var sourceInfo = sourceInfos[i];

                if (sourceInfo.kind === 'video') {
                    console.log(sourceInfo.id, sourceInfo.label || 'camera');

                    videoSource = sourceInfo.id;
                } else {
                    console.log('Some other kind of source: ', sourceInfo);
                }
            }

            _getUserMedia(videoSource);
        });

        function _getUserMedia(videoSource) {
            console.log(videoSource);

            navigator.getUserMedia = (navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia);

            if (navigator.getUserMedia) {
                navigator.getUserMedia(
                    // constraints
                    {
                        video: true,
                        optional: [
                            {sourceId: videoSource}
                        ]
                    },

                    // successCallback
                    function(localMediaStream) {
                        var video = document.querySelector('video');
                        var canvas = document.getElementById('canvas');
                        var photo        = document.getElementById('photo')
                        console.log(canvas);

                        video.src = window.URL.createObjectURL(localMediaStream);
                        video.onloadedmetadata = function(e) {
                            video.play();
                        };

                    },

                    // errorCallback
                    function(err) {
                        console.log('The following error occured: ' + err);
                    }
                );
            } else {
                console.log('getUserMedia not supported');
            }

        }

        ScannerView.prototype = Object.create(View.prototype);
        ScannerView.prototype.constructor = ScannerView;

        ScannerView.DEFAULT_OPTIONS = {};

        module.exports = ScannerView;
    });
