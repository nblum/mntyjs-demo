define([
    'Plugin',
    'jquery',
    'https://cdnjs.cloudflare.com/ajax/libs/packery/2.1.1/packery.pkgd.js',
    'https://bowercdn.net/c/jquery-bridget-2.0.1/jquery-bridget.js',
    'https://cdnjs.cloudflare.com/ajax/libs/draggabilly/2.1.1/draggabilly.pkgd.js'
], function (Plugin, $, Packery, jQueryBridget, Draggabilly) {
    return Plugin.extend({
        name: 'TileGrid',
        config: {
        },
        execute: function () {
            var me = this;

            jQueryBridget( 'packery', Packery, $ );
            me.$element.packery();

            // make all grid-items draggable
            me.$element.find('.grid-item').each( function( i, gridItem ) {
                var draggie = new Draggabilly( gridItem );
                // bind drag events to Packery
                me.$element.packery( 'bindDraggabillyEvents', draggie );
            });
        }
    });
});
