


// REWRITE TOUCH AND CLICK ACTIVE STATES FOR ".-active" CSS class
var touchRespond = {

	// sensitivity settings
	options: {
		touchMoveDelay: 200,		// wait this many ms to see if the user is about to scroll or tap the element
		slack: 35								// allow dragging this many px before deactivating the element state
	},

	// remove all other active states on the document
	reset: function(){
		__q('a').forEach(function(el) {
				el.classList.remove("-active");
		});
	},
	
	// add events to all elements on page
	init: function(){
		__q('a').forEach(function(el) {
		
			var pointerDown = false;
			var activeAvailable = true;
			var pointerLocFirst = {};
			var pointerLocLast = {};
			var touchMoveTimer = -1;
		
			var touchMoveDelay = touchRespond.options.touchMoveDelay;
			var slack = touchRespond.options.slack;
		
			// add/remove active classes
			var activate = function(self){ self.classList.add("-active"); }
			var deactivate = function(self){ self.classList.remove("-active"); activeAvailable = false;}
		
			// allow dragging and still keeping element active for [slack] pixels
			var outsideRange = function(a, b){
				getX = function(o) { return (typeof o.clientX !== 'undefined') ?  o.clientX : o.pageX; }
				getY = function(o) { return (typeof o.clientY !== 'undefined') ?  o.clientY : o.pageY; }
				withinRange = function(n1, n2) { if(n1 - slack <= n2 && n2 - slack <= n1) return true; else return false; }
						
				if(	withinRange(getX(a), getX(b))	&& withinRange(getY(a), getY(b)) ) return false; 
				else return true;
			}
		
			// activate down state
			var downstate = function(self, e){
				activeAvailable = true;
				activate(self);
				pointerDown = true;
				pointerLocFirst = e;
			}
			var upstate = function(self){
				if(pointerDown && activeAvailable) { touchRespond.reset(); activate(self); }
				pointerDown = false;
			}
			el.addEventListener("mousedown", function(e){ downstate(this, e); });
			el.addEventListener("mouseup", function(){ upstate(this); });
			el.addEventListener("touchstart", function(e){ 
				if (e.touches.length == 1){
					activeAvailable = true;
					pointerDown = true;
					var self = this;
					if (touchMoveTimer != -1) clearTimeout(touchMoveTimer);
					touchMoveTimer = setTimeout(function(){ // timeout function that doesn't add the class until delay [touchMoveDelay] has passed
						if(activeAvailable) downstate(self, e.touches[0]);
					}, touchMoveDelay);
				}
			});
			el.addEventListener("touchend", function(){ upstate(this); });
		
		
			// deactivate down state
			var pointermove = function(self, e){
				if(activeAvailable){
					pointerLocLast = e;
					if(pointerDown && outsideRange(pointerLocFirst, pointerLocLast)) {
						deactivate(self);
						pointerDown = false;
					}
				}
			}
			var pointerout = function(self){ if(pointerDown && activeAvailable) deactivate(self); }
			el.addEventListener("mousemove", function(e){ pointermove(this, e); });
			el.addEventListener("mouseout", function(){ pointerout(this); });
			el.addEventListener("touchmove", function(e){ pointermove(this, e.targetTouches[0]); });
			el.addEventListener("touchleave", function(){ pointerout(this); });
			el.addEventListener("touchcancel", function(){ pointerout(this); });
		

		});
	}
};
document.addEventListener('DOMContentLoaded', touchRespond.init);