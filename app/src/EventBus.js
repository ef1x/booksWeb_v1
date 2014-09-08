define(function(require) {
    var EventHandler = require('famous/core/EventHandler');

    var EventBus = new EventHandler();
    return EventBus;
});
