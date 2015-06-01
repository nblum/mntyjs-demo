define(['./Ball', 'Window'], function (Ball, Window) {
	/**
	 * Class extends the Ball class
	 * All BoxCollide objects can detect collisions and move in an other direction
	 */
    var BallCollide = Ball.extend({
        name: 'BoxCollide',
        /**
         * @inheritdoc
         */
        execute: function () {
        	var me = this;
        	
        	me.base();
        	
        	me.$element.css('transform', ' translateZ(0)');
        	me.$element.css('border', '2px dashed black');
        	me.$element.css('opacity', '1');
        	
			me.watchPosition();
			me.bindSystemMessage('position', 'onPositionChange');
        },
        /**
         * @inheritdoc
         */
        destroy: function () {
        	var me = this;
        	
        	if (me.timeout) {
        		clearTimeout(me.timeout);
        	}
        },
        /**
         * sends periodically a system message to notify other Ball Objects
         * the period time is calculated by the own current speed
         * a slower ball will send messages in a lower interval
         */
        watchPosition: function () {
        	var me = this,
        		//calculates next call
        		pos = me.getPos(),
        		nextCall = 1000 / me.currentSpeed;

    		//$('.area').append('<div style="position: absolute; width:2px; height: 2px; background: silver; left:' + pos.x + 'px; top: ' + pos.y + 'px;"></div>');
    		me.sendSystemMessage('position', me);
    		
    		//call recursive after calculated interval
    		me.timeout = setTimeout(me.bind('watchPosition'), nextCall);
        },
        /**
         * checks collision with given ball element
         * called by system message (position update) from other ball objects
         * @param el Ball object
         * @param object pos {x,y}
         */
        onPositionChange: function (bOther, pos) {
        	if(bOther === this) {
        		return;
        	}
        	
        	var me = this,
        		bSelfPos = me.getPos(),
        		dist = me.getDist(bOther.getPos(), bSelfPos),
        		isColission = dist < (me.getSize() / 2 + bOther.getSize() / 2);       	
        	
        	if(isColission) {
        		me.onCollission(bSelfPos, bOther);
        	}
        },
        /**
         * handles all reactions on a collsion
         * - calculates new target and starts new move
         * @param object bSelf
         * @param object bOther
         */
        onCollission: function (selfPos, bOther) {
        	var me = this,
        		otherPos = bOther.getPos(),
        		targetMin = me.getPosObj(),
        		targetMax = me.getPosObj();
        		
        	//calculate new target range (depending on the current positions)
    		targetMin.x = (selfPos.x > otherPos.x ? otherPos.x : 0);
    		targetMin.y = (selfPos.y > otherPos.y ? selfPos.y : 0);
    		targetMax.x = (selfPos.x < otherPos.x ? otherPos.x : 0);
    		targetMax.y = (selfPos.y < otherPos.y ? selfPos.y : 0);
    		
    		//start new move

    		me.startMoving(targetMin, targetMax, me.currentSpeed * me.getSize() * bOther.getSize());
        }
    });

    return BallCollide;
});
