define([
        'require',
        'exports',
        'module',
        'EventBus',
        'Layout',
        'famous/core/View',
        'famous/core/Surface',
        'famous/core/Transform',
        'famous/modifiers/StateModifier',
        'famous/views/HeaderFooterLayout',
        'famous/surfaces/ImageSurface'
    ],
    function(require, exports, module, EventBus, Layout) {
        var View = require('famous/core/View');
        var Surface = require('famous/core/Surface');
        var Transform = require('famous/core/Transform');
        var StateModifier = require('famous/modifiers/StateModifier');
        var ImageSurface = require('famous/surfaces/ImageSurface');

        function HeaderView() {
            View.apply(this, arguments);
            var backgroundSurface = new Surface({
                properties: {
                    backgroundColor: '#222222'
                }
            });

            this.hamburgerSurface = new ImageSurface({
                size: [44, 44],
                content: 'img/hamburger.png',
                properties: {
                    cursor: 'pointer'
                }
            });

            this.nameSurface = new Surface({
                size: [, 44],
                content: '',
                properties: {
                    color: 'white',
                    textAlign: 'left',
                    backgroundColor: '#222222',
                    fontSize: '20px',
                    paddingTop: '9px'
                }

            });

            var backgroundModifier = new StateModifier({
                transform: Transform.behind
            });

            var hamburgerModifier = new StateModifier({
                origin: [0, 0.5],
                align: [0, 0.5]
            });

            var nameModifier = new StateModifier({
                transform: Transform.translate(60, 0,0 )
            });

            this.add(backgroundModifier).add(backgroundSurface);
            this.add(hamburgerModifier).add(this.hamburgerSurface);
            this.add(nameModifier).add(this.nameSurface);

            _setListeners.call(this);

            EventBus.on('changename', _setViewName.bind(this));

            Layout.setHeader(this);
        }

        HeaderView.prototype = Object.create(View.prototype);
        HeaderView.prototype.constructor = HeaderView;



        HeaderView.DEFAULT_OPTIONS = {
            headerSize: 44
        };

        function _setViewName(viewName) {
            this.nameSurface.setContent(viewName);
        }

        function _setListeners() {

            this.hamburgerSurface.on('click', function() {
                console.log(this);
                EventBus.emit('navigation:toggle');
            });

        }

        module.exports = HeaderView;
    });
