define(['require',
        'exports',
        'module',
        'EventBus',
        'Layout',
        'famous/core/Transform',
        'famous/modifiers/StateModifier',
        'views/NavigationView'

    ],
    function(require, exports, module, EventBus, Layout) {
        // var View          = require('famous/core/View');
        // var Surface       = require('famous/core/Surface');
        var Transform = require('famous/core/Transform');
        var StateModifier = require('famous/modifiers/StateModifier');
        var NavigationView = require('views/NavigationView');

        function NavigationController() {
            this.menu = false;
            this.state = new StateModifier({
                transform: this.options.naviOut
            });

            this.view = new NavigationView();

            Layout.setNavigation(this.state).add(this.view);

            //listen for event emit from Navigation View by click on hamburger
            //call function toggle
            EventBus.on('navigation:toggle', this.toggle.bind(this));
        }

        // NavigationController.prototype = Object.create();
        NavigationController.prototype.constructor = NavigationController;

        NavigationController.prototype.options = {

            naviOut: Transform.translate(-280, 0, 0),
            naviIn: Transform.translate(0, 0, 1)
        };

        NavigationController.prototype.toggle = function() {
            if (this.menu) {
                this.hide();
            }
            else {
                this.show();
            }

        };
        NavigationController.prototype.hide = function() {
            this.state.setTransform(this.options.naviOut);
            this.menu = false;
        };

        NavigationController.prototype.show = function() {
            this.state.setTransform(this.options.naviIn);
            this.menu = true;
        };

        module.exports = NavigationController;
    });
