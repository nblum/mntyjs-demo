/**
 * additional configuration for requirejs
 */
require.config({
    //adding timestamp as cache breaker
    urlArgs: 'bust=' + (new Date()).getTime(),
    paths: {
        doTCompiler: 'https://cdnjs.cloudflare.com/ajax/libs/dot/1.0.3/doT.min',
        text: 'https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min',
        doT: 'vendor/requirejs-doT/doT',
        personTpl: 'tpl/person'
    },
    doT: {
        ext: '.html',
    }
});
