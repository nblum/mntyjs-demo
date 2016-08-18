/**
 * additional configuration for requirejs
 */
require.config({
    //adding timestamp as cache breaker
    urlArgs: 'bust=' + (new Date()).getTime(),
    paths: {

    }
});
