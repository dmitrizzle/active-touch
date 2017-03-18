// REWRITE TOUCH AND CLICK ACTIVE STATES FOR ".--active" CSS class
export const activeTouch = {
	// sensitivity settings
	options: {
		touchMoveDelay: 200,			// wait this many ms to see if the user is about to scroll or tap the element
		slack: 					35,				// allow dragging this many px before deactivating the element state
		selectors: 			["a"],		// CSS selectors affected by this script
	},

	// remove all other active states on the document
	reset: function(){
		for (var el of document.querySelectorAll(this.options.selectors[0])) el.classList.remove("--active")
	},
	
	// add events to all elements on page
	init: function(){
		for (var el of document.querySelectorAll(this.options.selectors)) {
			let pointerDown = 			false
			let activeAvailable = 	true
			let pointerLocFirst = 	{}
			let pointerLocLast = 		{}
			let touchMoveTimer = 		-1
		
			let touchMoveDelay = 		this.options.touchMoveDelay
			let slack = 						this.options.slack
						
			// add/remove active classes
			const activate = (el) 	=> el.classList.add("--active")
			const deactivate = (el) => { el.classList.remove("--active"); activeAvailable = false }
		
		
			// allow dragging and still keeping element active for [slack] pixels
			const outsideRange = (a, b) => {
				const getX = (o) => (typeof o.clientX !== 'undefined') ?  o.clientX : o.pageX
				const getY = (o) => (typeof o.clientY !== 'undefined') ?  o.clientY : o.pageY
				const withinRange = (n1, n2) => { if(n1 - slack <= n2 && n2 - slack <= n1) return true; else return false; }
						
				if(	withinRange(getX(a), getX(b))	&& withinRange(getY(a), getY(b)) ) return false
				else return true
			}
		
			// activate down state
			const downstate = (el, e) => {
				activeAvailable = true
				activate(el)
				pointerDown = 		true
				pointerLocFirst = e
			}
			const upstate = (el) => {
				if(pointerDown && activeAvailable) {
					this.reset()
					activate(el)
				}
				pointerDown = false
			}
			
			el.addEventListener("mousedown", 	function(e){ downstate(this, e) })
			el.addEventListener("mouseup", 		function( ){ upstate(this) })
		
			el.addEventListener("touchstart", function(e){ 
				if (e.touches.length == 1){
					activeAvailable = true
					pointerDown = 		true
					let el = 					this
					(touchMoveTimer != -1) ? clearTimeout(touchMoveTimer) : null

					// timeout function that doesn't add the class until delay [touchMoveDelay] has passed
					let touchMoveTimer = setTimeout(() => activeAvailable ? downstate(self, e.touches[0]) : null, touchMoveDelay)
					
				}
			});
			el.addEventListener("touchend", function(){ upstate(this) })
		
			// deactivate down state
			const pointermove = (el, e) => {
				if(activeAvailable){
					let pointerLocLast = e
					if( pointerDown && outsideRange(pointerLocFirst, pointerLocLast) ) {
						deactivate(el)
						pointerDown = false
					}
				}
			}
			const pointerout = (el) => (pointerDown && activeAvailable) ? deactivate(el) : null
			el.addEventListener("mousemove", 		function(e){ pointermove	(this, e) })
			el.addEventListener("mouseout", 		function( ){ pointerout		(this) })
			el.addEventListener("touchmove", 		function(e){ pointermove	(this, e.targetTouches[0]) })
			el.addEventListener("touchleave", 	function( ){ pointerout		(this) })
			el.addEventListener("touchcancel", 	function( ){ pointerout		(this) })
 

		}
	}
}