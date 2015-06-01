define(['Plugin', 'Window'], function (Plugin, Window) {
    /**
     * handles ball area
     * - can add new balls via systemMessag addBall
     * - updates ball count
     */
    var Manager = Plugin.extend({
        name: 'Manager',
        config: {
            count: '.count',
            area: '.area',
            ballSelector: '.ball'
        },
        /**
         * @inheritdoc
         */
        execute: function () {
        	var me = this;
			me.bindSystemMessage('addBall', 'onAddBall');
			me.bindSystemMessage('removedBall', 'onRemovedBall');
        },
        /**
         * adding ball with given config
         * @param {object} config
         */
        onAddBall: function (config) {
            var me = this,
        		configString = JSON.stringify(config).replace(/"/gi,'\'').replace(/^{/,'').replace(/}$/,''),
        		boxDefault = '<div class="ball" data-mount="Ball" data-ball="' + configString + '"></div>',
        		boxCollide = '<div class="ball" data-mount="BallCollide" data-ballcollide="' + configString + '"></div>',
        		box = config.collision ? boxCollide : boxDefault;

	    	me.$child(me.getArea()).append(box);
            me.updateCount();
        },
        /**
         * handles after a ball has removed
         */
        onRemovedBall: function () {
            var me = this;

            me.updateCount();
        },
        /**
         * updates ball count by counting dom elements
         */
        updateCount: function () {
            var me = this,
                count = me.$child(me.getBallSelector()).length;

            me.$child(me.getCount()).html(count);
        }
    });

    return Manager;
});
