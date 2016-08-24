define(['Plugin'], function (Plugin) {
    return Plugin.extend({
        name: 'Logger',
        config: {
            prefix: ''
        },
        execute: function () {
            this.log('executed');
        },
        init: function () {
            this.log('init');
        },
        onFinished: function () {
            this.log('onFinished');
        },
        applyPrefix: function (newValue) {
            this.log('applyPrefix', newValue);
            return newValue;
        },
        updatePrefix: function (newValue) {
            this.log('updatePrefix', newValue);
        },
        log: function (msg) {
            console.log(this.getPrefix() + ' ' + msg);
        }
    });
});
