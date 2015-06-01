define(['Plugin', 'Window'], function (Plugin, Window) {
	/**
	 * The class Ball moves itself with css transitions in border of its
	 * parent (relative) dom element
	 */
    var Ball = Plugin.extend({
        name: 'Ball',
        config: {
        	color: '#000000',
        	size: 50,
        	age: 0,
        	posX: 0,
        	posY: 0,
        	speed: 5
        },
        /**
         * @inheritdoc
         */
        execute: function () {
        	var me = this;

	    	me.$element.css('background-color', me.getColor());
	    	me.$element.css('position', 'absolute');
	    	me.$element.css('width', me.getSize());
	    	me.$element.css('height', me.getSize());
	    	me.$element.css('top', me.getPosX());
	    	me.$element.css('left', me.getPosY());
	    	me.$element.css('border-radius', me.getSize());
        	me.$element.css('opacity', '0.8');

	    	me.$element[0].addEventListener('transitionend', me.bind('movingFinished'), false);
	    	me.startMoving();

	    	if (me.getAge() > 0) {
	    		setTimeout(me.bind('destroyMe'), me.getAge() * 1000);
	    	}
        },
        /**
         * @inheritdoc
         */
        destroy: function () {
        	var me = this;
            //@todo why does system message not firing here
            //me.sendSystemMessage('removedBall');
        },
        /**
         * destorys the dom element (plugin will be destroyed, too)
         */
        destroyMe: function () {
        	var me = this;
            //dom element still exists -> wrong count
            me.sendSystemMessage('removedBall');
        	me.$element.remove();
        },
        /**
         * will start a new move after moving has finished
         */
        movingFinished: function () {
        	var me = this;
        	me.startMoving();
        },
        /**
         * stars a new move with random target
         * considers borders of relative parent dom element
         * the params minPos and maxPos limits the target area
         * @param {x,y} minPos
         * @param {x,y} maxPos
         */
    	startMoving: function (minPos, maxPos) {
        	var me = this,
        		xMin = (!!minPos ? minPos.x : 0),
        		yMin = (!!minPos ? minPos.y : 0),
        		pos = me.getPos(),
        		target = me.getPosObj();
        		xMax = (!!maxPos && maxPos.x > 0 ? maxPos.x : parseInt(me.$element.parent().css('width')) - parseInt(me.$element.css('width')) / 2 - pos.x),
        		yMax = (!!maxPos && maxPos.y > 0 ? maxPos.y : parseInt(me.$element.parent().css('height')) - parseInt(me.$element.css('height')) / 2 - pos.y);

        		target.x = me.rand(xMin, xMax);
        		target.y = me.rand(yMin, yMax);

	    	me.move(target);
    	},
    	/**
    	 * moves the element to the given position with given speed
    	 * @param {x,y} target
    	 * @param int speed
    	 */
        move: function (target, speed) {
        	var me = this,
        		from = me.getPos(),
        		dist = me.getDist(from, target),
        		currentSpeed = (!!speed ? speed : me.getSpeed()),
        		duration = me.getDuration(dist, currentSpeed);

        	me.$element.css('transform', 'translate(' + target.x + 'px,' + target.y + 'px)');
        	me.$element.css('transition-duration', duration + 's');
        	me.currentSpeed = currentSpeed;
        },
        /**
         * calculates a random number in given range
         * @param int from
         * @param int to
         * @return random number
         */
        rand: function (from, to) {
        	return Math.floor((Math.random() * to) + from);
        },
        /**
         * calulates the distance between to point in 2d
         * @param {x,y} pos1
         * @param {x,y} pos2
         * @return float
         */
        getDist: function(pos1, pos2) {
        	return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
        },
        /**
         * returns the current position relative to the parent element
         * position is the middle of the element
         * @return {x,y}
         */
        getPos: function() {
        	var me = this,
        		pos = me.$element.position();

        	return {
    			x: pos.left + me.getSize() / 2,
    			y: pos.top + me.getSize() / 2
    		};
        },
        /**
         * returns an empty pos obj
         * @return {x,y}
         */
        getPosObj: function() {
        	return {
    			x: 0,
    			y: 0
    		};
        },
        /**
         * returns a duration by given speed an distance
         * @param int dist
         * @param int speed
         * @return int
         */
        getDuration: function(dist, speed) {
        	return parseInt(dist) / 10 / parseInt(speed);
        }
    });

    return Ball;
});
