define([
        'require',
        'exports',
        'module',
        'EventBus',
        'famous/core/View',
        'famous/core/Surface',
        'famous/core/Transform',
        'famous/modifiers/StateModifier',

        'famous/surfaces/FormContainerSurface',
        'famous/surfaces/InputSurface',
        'famous/surfaces/SubmitInputSurface'

    ],
    function(require, exports, module, EventBus) {
        var View = require('famous/core/View');
        var Surface = require('famous/core/Surface');
        var Transform = require('famous/core/Transform');
        var StateModifier = require('famous/modifiers/StateModifier');
        var FormContainerSurface = require('famous/surfaces/FormContainerSurface');
        var InputSurface = require('famous/surfaces/InputSurface');
        var SubmitInputSurface = require('famous/surfaces/SubmitInputSurface');
        var ImageSurface = require('famous/surfaces/ImageSurface');

        function SearchView() {
            View.apply(this, arguments);

            var scanState = new StateModifier({
                origin: [0.5, 0.7],
                align: [0.5, 0.7]
            });
            this.scanner = new SubmitInputSurface({
                origin: [0, 0],
                classes: ['scannerButton'],
                size: [300, 40],
                value: 'Scanner'
            });

            var searchState = new StateModifier({
                origin: [0.5, 0.5],
                align: [0.5, 0.5]
            });
            this.search = new InputSurface({
                size: [300, 40],
                placeholder: 'search keyword'
            });

            var submitState = new StateModifier({
                origin: [0.5, 0.2],
                align: [0.5, 0.2]
            });

            var imgSuface = new ImageSurface({
                content: 'img/search.png'
            });

            this.submit = new SubmitInputSurface({
                classes: ['searchButton'],
                size: [300, 40],
                value: 'search'
            });

            this.add(searchState).add(this.search);
            this.add(submitState).add(this.submit);
            this.add(scanState).add(this.scanner);


            this.scanner.on('click', function() {
                EventBus.emit('search:scanner');
            });

            this.submit.on('click', this.submitForm.bind(this));
        }

        SearchView.prototype = Object.create(View.prototype);
        SearchView.prototype.constructor = SearchView;

        SearchView.prototype.submitForm = function() {
            console.log(this);
            EventBus.emit('search:byphrase', {phrase: this.search.getValue()});
        };

        SearchView.DEFAULT_OPTIONS = {};

        module.exports = SearchView;
    });
