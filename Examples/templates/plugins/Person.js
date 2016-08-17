define([
    'Plugin',
    'doT!personTpl'
], function (Plugin, personTpl) {
    return Plugin.extend({
        name: 'Person',
        config: {
            name: '',
            street: '',
            hobbies: []
        },
        execute: function () {
            var me = this;

            me.fill();
        },
        fill: function () {
            var me = this;

            me.$element.html(personTpl({
                name: me.getName(),
                street: me.getStreet(),
                hobbies: me.getHobbies()
            }))
        }
    });
});
