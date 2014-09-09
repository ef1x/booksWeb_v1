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
            string += '<video id="video"></video>';
            string += '<canvas id="canvas"></canvas>';
            string += '<div id="photo"></div>';

            this.search = new Surface({
                content: string

            });

//            this.photo = new SubmitInputSurface({
//                size: [300, 40],
//                value: 'photo'
//            });

            this.add(this.search);
//            this.add(this.photo);

            this.search.on('click', function(ev) {
                takepicture();
                ev.preventDefault();
            });

            _getUserMedia();
        }

        function takepicture() {
            canvas.width = 300;
            canvas.height = 300;
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
            console.log(canvas);
            var data = canvas.toDataURL('image/png');
            photo.setAttribute('src', data);
            console.log(data);
            DecodeBar(canvas);
        }

        function DecodeBar(canvas) {
            var DecodeWorker = new Worker("../src/views/DecoderWorker.js");
            ctx = canvas.getContext('2d');
//            canvas.width = 300;
//            canvas.height = 300;
//            showPicture.onload = function () {
//                ctx.drawImage(showPicture,0,0,Canvas.width,Canvas.height);
//                resultArray = [];
//                workerCount = 2;
//                Result.innerHTML="";
                DecodeWorker.postMessage({ImageData: ctx.getImageData(0, 0, canvas.width, canvas.height).data, Width: canvas.width, Height: canvas.height, cmd: "normal"});
//            };

            DecodeWorker.addEventListener('message', function(e) {
                console.log('Worker said: ', e.data);
            }, false);
        }

        function _getUserMedia() {

            var videoSource = MediaStreamTrack.getSources(function(sourceInfos) {
                var audioSource = null;
                var videoSource = null;

                for (var i = 0; i != sourceInfos.length; ++i) {
                    var sourceInfo = sourceInfos[i];

                    if (sourceInfo.kind === 'video') {
                        console.log(sourceInfo.id, sourceInfo.label || 'camera');

                        videoSource = sourceInfo.id;
                        return videoSource;
                    } else {
                        console.log('Some other kind of source: ', sourceInfo);
                    }
                }
            });

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
                        var video = document.getElementById('video');
                        var canvas = document.getElementById('canvas');
                        var photo        = document.getElementById('photo');
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
