/*globals require*/
require.config({
    shim: {

    },
    paths: {
        famous: '../lib/famous',
        requirejs: '../lib/requirejs/require',
        almond: '../lib/almond/almond',
        'famous-polyfills': '../lib/famous-polyfills/index',
        'famous-map': '../lib/famous-map',
        jquery: '../lib/jquery/dist/jquery'
    },
    packages: [

    ]
});
require(['main']);
