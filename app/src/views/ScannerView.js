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

        var DecodeWorker = new Worker("../src/views/DecoderWorker.js");
        DecodeWorker.onmessage = receiveMessage;

        function ScannerView() {
            View.apply(this, arguments);
            //string += '<p><input type=button value='&#x1F4F7;' onclick='snapshot()'>';
            string = '<video id="video" width="360" ></video>';
            string += '<canvas id="canvas"></canvas>';
            string += '<div><img id="photo"/></div>';

            this.search = new Surface({
                content: string
            });

            this.add(this.search);

            this.search.on('click', function(ev) {
                takepicture();
                ev.preventDefault();
            });

            _selectSource();
        }

        function takepicture() {

            //showPicture = document.getElementById('photo');
            canvas.width = 360;
            canvas.height = 270;
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
            console.log(canvas);
            var data = canvas.toDataURL('image/png');
            //photo.setAttribute('src', data);
            //showPicture.src = data;
            console.log(data);
            DecodeBar(canvas);
        }

        function DecodeBar(Canvas) {

                ctx = canvas.getContext("2d");
                //ctx = canvas.getContext('2d');
//            canvas.width = 300;
//            canvas.height = 300;
//            showPicture.onload = function () {
                ctx.drawImage(video,0,0,Canvas.width,Canvas.height);
//                resultArray = [];
                workerCount = 1;
//                Result.innerHTML="";
                //var canvasImage = canvas.getContext('2d').drawImage(showPicture, 0, 0, canvas.width, canvas.height);
                resultArray = [];
                Result = alert('result');
                //DecodeWorker.postMessage({ImageData: canvasImage, Width: canvas.width, Height: canvas.height, cmd: "normal", Decode: ["EAN-13"]});
                DecodeWorker.postMessage({ImageData: ctx.getImageData(0,0,Canvas.width,Canvas.height).data, Width: Canvas.width, Height: Canvas.height, cmd: "normal",
                    Decode: ["EAN-13"], Ean13Speed:false});

//                DecodeWorker.addEventListener('message', function (e) {
//                    console.log('Worker said: ', e.data);
//                }, false);

                DecodeWorker.onmessage = receiveMessage;

        }

        function receiveMessage(e) {
            if(e.data.success === "log") {
                console.log(e.data.result);
                return;
            }
            if(e.data.finished) {
                workerCount--;
                if(workerCount) {
                    if(resultArray.length == 0) {
                        console.log('recive');
                        DecodeWorker.postMessage({ImageData: ctx.getImageData(0,0,canvas.width,canvas.height).data, Width: canvas.width, Height: canvas.height, cmd: "right"});
                    } else {
                        workerCount--;
                    }
                }
            }
            if(e.data.success){
                var tempArray = e.data.result;
                for(var i = 0; i < tempArray.length; i++) {
                    if(resultArray.indexOf(tempArray[i]) == -1) {
                        resultArray.push(tempArray[i]);
                    }
                }
                Result= alert(resultArray.join("<br />"));
            }else{
                if(resultArray.length === 0 && workerCount === 0) {
                    Result =alert('failed') ;
                }
            }
        }

        function _selectSource() {

            MediaStreamTrack.getSources(function (sourceInfos) {
                var audioSource = null;
                var videoSource = null;

                for (var i = 0; i != sourceInfos.length; ++i) {
                    var sourceInfo = sourceInfos[i];

                    console.log(sourceInfo);

                    if (sourceInfo.kind === 'video' && (sourceInfo.facing === 'environment' || sourceInfo.facing === '') ) {
                        console.log(sourceInfo.id, sourceInfo.label || 'camera');

                        videoSource = sourceInfo.id;
                        _getUserMedia(videoSource);
                    } else {
                        console.log('Some other kind of source: ', sourceInfo);
                    }
                }
            });
        }

        function _getUserMedia(videoSource) {
            console.log(videoSource);

            navigator.getUserMedia = (navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia);

            var constraints = {
                video: {
                    optional: [{sourceId: videoSource}]
                }
            };
            navigator.getUserMedia(constraints, function(localMediaStream){

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
                    });
        }

        ScannerView.prototype = Object.create(View.prototype);
        ScannerView.prototype.constructor = ScannerView;

        ScannerView.DEFAULT_OPTIONS = {};

        module.exports = ScannerView;
    });
