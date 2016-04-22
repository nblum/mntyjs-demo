define(['Plugin', 'Window'], function (Plugin, Window) {
    var Alerter = Plugin.extend({
        execute: function () {
            var me = this;
            me.showMsg(me.$element.text());
        },
        showMsg: function (msg) {
            var me = this;
            Window.alert(msg);
        }
    });
    return Alerter;
});
