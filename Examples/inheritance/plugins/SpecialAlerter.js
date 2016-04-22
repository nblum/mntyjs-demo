define(['plugins/Alerter'], function (Alerter) {
    var SpecialAlerter = Alerter.extend({
        showMsg: function (msg) {
            var me = this;
            //calling base method
            me.base('Special:' + msg);
        }
    });
    return SpecialAlerter;
});
