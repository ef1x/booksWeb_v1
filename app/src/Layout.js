
define(function(require, exports, module) {
    // include required components
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var HeaderFooter = require('famous/views/HeaderFooterLayout');
    var RenderController = require('famous/views/RenderController');

    function Layout() {
        View.apply(this, arguments);

        // generate layout with a 44px headersize like on iphones
        this.layout = new HeaderFooter({
            headerSize: 44
        });
        this.add(this.layout);

        this.content = new Surface({
            classes: ["backgroundImage"]

        });

        // generate a content controller
        this.contentController = new RenderController();
        this.layout.content.add(this.content);
        this.layout.content.add(this.contentController);

    }

    Layout.prototype = Object.create(View.prototype);
    Layout.prototype.constructor = Layout;

    Layout.DEFAULT_OPTIONS = {};

    // wrapper for show of the contentcontroller
    // to show views from outside
    Layout.prototype.show = function(view) {
        this.contentController.show(view);
    };

    // set header from other module
    Layout.prototype.setHeader = function(view) {
        this.layout.header.add(view);
    };

    // set navigation from other module
    Layout.prototype.setNavigation = function(view) {
        return this.layout.content.add(view);
    };

    module.exports = new Layout();
});
