define(['require',
    'exports',
    'module',
    'Layout',
    'EventBus',
    'famous/core/View',
    'famous/core/Surface'
], function(require, exports, module, Layout, EventBus) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    // var Transform     = require('famous/core/Transform');
    // var StateModifier = require('famous/modifiers/StateModifier');

    function EmptyView() {
        View.apply(this, arguments);
        var test = new Surface({
            content: 'Test'
        });

        test.on('click', function() {
            EventBus.emit('test');
        });

        Layout.setNavigation(test);
    }

    EmptyView.prototype = Object.create(View.prototype);
    EmptyView.prototype.constructor = EmptyView;

    EmptyView.DEFAULT_OPTIONS = {};

    module.exports = EmptyView;
});
