define(['Plugin', 'Window'], function (Plugin, Window) {

    var Control = Plugin.extend({
        name: 'Control',
        config: {
        	areaSel: '.area'
        },
        /**
         * @inheritdoc
         */
        execute: function () {
        	var me = this;
	    	me.$element.on('submit', me.bind('onSubmit'));
        },
        /**
         * handles form submit
         * sends a system message with form config
         * updates form with random values
         * @param {event} e
         */
        onSubmit: function (e) {
        	var me = this,
        		$size = me.$child('input[name="size"]'),
        		$age = me.$child('input[name="age"]'),
        		$speed = me.$child('input[name="speed"]'),
        		$color = me.$child('select[name="color"]'),
        		config = {
        			size: parseInt($size.val()),
        			age: parseInt($age.val()),
        			speed: parseInt($speed.val()),
        			color: $color.val(),
                    collision: me.$child('input[name="collision"]').prop('checked')
        		};

        	e.preventDefault();

        	$size.val(me.rand($size.attr('min'), $size.attr('max'), 5));
        	$age.val(me.rand($age.attr('min'), $age.attr('max'), 5));
        	$speed.val(me.rand($speed.attr('min'), $speed.attr('max')));
        	$color.val(me.$child($color.children()[me.rand(0, $color.children().length - 1)]).attr('value'));

            me.sendSystemMessage('addBall', config);
        },
        /**
         * calculates a randum number
         * @param {int} from
         * @param {int} to
         * @param {int} prec - precision of random number (default is 1)
         * @returns {int}
         */
        rand: function (from, to, prec) {
        	var min = parseInt(from),
        		max = !!prec ? parseInt(to) / prec : parseInt(to),
        		result = Math.floor(Math.random() * (max - min + 1)) + min;

        	return !!prec ? result * prec : result;
        }
    });

    return Control;
});
