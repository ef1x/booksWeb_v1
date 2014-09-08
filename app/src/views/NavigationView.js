define(['require',
        'exports',
        'module',
        'EventBus',
        'Layout',
        'famous/core/View',
        'famous/core/Surface',
        'famous/core/Transform',
        'famous/views/FlexibleLayout',
        'famous/modifiers/StateModifier',
        'famous/surfaces/ContainerSurface'
    ],
    function(require, exports, module, EventBus, Layout) {
        var View = require('famous/core/View');
        var Surface = require('famous/core/Surface');
        var Transform = require('famous/core/Transform');
        var FlexibleLayout = require('famous/views/FlexibleLayout');
        var StateModifier = require('famous/modifiers/StateModifier');
        var ImageSurface = require('famous/surfaces/ImageSurface');
        var ContainerSurface = require('famous/surfaces/ContainerSurface');

        function NavigationView() {
            View.apply(this, arguments);

            var backgroundModifier = new StateModifier({
                transform: Transform.behind
            });

            var background = new Surface({
                size: [280, undefined],
                properties: {
                    backgroundColor: '#FAEBD7'
                }
            });

            this.add(backgroundModifier).add(background);
            _addMenuItem.call(this, 'Search', 'img/action_search.png', 'search', 'show', 40);
            _addMenuItem.call(this, 'Next Library', 'img/location_map.png', 'maps', 'show', 80);
            _addMenuItem.call(this, 'Favorites', 'img/rating_important.png', 'favorites', 'loadData', 120);
        }

        NavigationView.prototype = Object.create(View.prototype);
        NavigationView.prototype.constructor = NavigationView;

        NavigationView.DEFAULT_OPTIONS = {};

        module.exports = NavigationView;

        function _addMenuItem(name, icon, module, method, offset, height) {
            height = typeof height !== 'undefined' ? height : 20;
            var itemState = new StateModifier({
                transform: Transform.translate(0, offset, 1)
            });

            var container = new ContainerSurface({
                size: [,40]
            });

            var containerModifier = new StateModifier({
                transform: Transform.translate(0, offset, 0)
            });

            var iconSurface = new ImageSurface({
                content: icon,
                size:   [20, 20]
            });

            var iconModifier = new StateModifier({
                transform: Transform.translate(10, 0, 0)
            });

            var item = new Surface({
                content: name,
                size: [undefined, 20]
            });

            var rightModifier = new StateModifier({
                transform: Transform.translate(40, 0, 0)
            });

            item.on('click', function() {
                EventBus.emit(module + ':' + method);
                //console.log(module + ':' + methode);
                EventBus.emit('navigation:toggle');
            });

            container.add(iconModifier).add(iconSurface);
            container.add(rightModifier).add(item);
            this.add(containerModifier).add(container);

        }
    });
