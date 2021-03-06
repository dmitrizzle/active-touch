// REWRITE TOUCH AND CLICK DOWNSTATE STATES FOR ".downstate" CSS class
export const activeTouch = {
	// sensitivity settings
	options: {
		touchMoveDelay: 200,					// wait this many ms to see if the user is about to scroll or tap the element
		slack: 					35,						// allow dragging this many px before deactivating the element state
		selectors: 			["a"],				// CSS selectors affected by this script
		cssclass:				"downstate",	// default css class for downstate elements
	},

	// remove all other downstate states on the document
	reset: function(){
		let opto = this.options
		for (let el of [...document.querySelectorAll(opto.selectors)]) el.classList.remove(opto.cssclass)
	},
	
	// add events to all elements on page
	init: function(options){
		// changes could be checked and applied
		if(typeof options === "object"){
			typeof options.cssclass === "string" ? this.options.cssclass = options.cssclass : null
			typeof options.selectors !== "undefined" && options.selectors.constructor === Array ? this.options.selectors = options.selectors : null
		} else 
			throw Error("Wrong variable type passed as options. It needs to be an object in a form of { cssclass: 'value', selectors: ['value','..'] }")
		
		let opto = this.options
		for (let el of [...document.querySelectorAll(opto.selectors)]) {
			let pointerDown = 			false
			let downstateAvailable = 	true
			let pointerLocFirst = 	{}
			let pointerLocLast = 		{}
			let touchMoveTimer = 		-1

			let touchMoveDelay = 		opto.touchMoveDelay
			let slack = 						opto.slack
						
			// add/remove downstate classes
			const activate = (el) 	=> el.classList.add(opto.cssclass)
			const deactivate = (el) => { el.classList.remove(opto.cssclass); downstateAvailable = false }
		
		
			// allow dragging and still keeping element downstate for [slack] pixels
			const outsideRange = (a, b) => {
				const getX = (o) => (typeof o.clientX !== 'undefined') ?  o.clientX : o.pageX
				const getY = (o) => (typeof o.clientY !== 'undefined') ?  o.clientY : o.pageY
				const withinRange = (n1, n2) => { if(n1 - slack <= n2 && n2 - slack <= n1) return true; else return false; }
						
				if(	withinRange(getX(a), getX(b))	&& withinRange(getY(a), getY(b)) ) return false
				else return true
			}
		
			// activate down state
			const downstate = (el, e) => {
				downstateAvailable = true
				activate(el)
				pointerDown = 		true
				pointerLocFirst = e
			}
			const upstate = (el) => {
				if(pointerDown && downstateAvailable) {
					this.reset()
					activate(el)
				}
				pointerDown = false
			}
			
			el.addEventListener("mousedown", 	function(e){ downstate(this, e) })
			el.addEventListener("mouseup", 		function( ){ upstate(this) })
		
			el.addEventListener("touchstart", function(e){
				if (e.touches.length == 1){
					downstateAvailable, pointerDown = true
					let el = this;
					
					(touchMoveTimer != -1) ? clearTimeout(touchMoveTimer) : null

					// timeout function that doesn't add the class until delay [touchMoveDelay] has passed
					let touchMoveTimer = setTimeout(() => downstateAvailable ? downstate(this, e.touches[0]) : null, touchMoveDelay)
					
				}
			})
			el.addEventListener("touchend", function(){ upstate(this) })
		
			// deactivate down state
			const pointermove = (el, e) => {
				if(downstateAvailable){
					let pointerLocLast = e
					if( pointerDown && outsideRange(pointerLocFirst, pointerLocLast) ) {
						deactivate(el)
						pointerDown = false
					}
				}
			}
			const pointerout = (el) => (pointerDown && downstateAvailable) ? deactivate(el) : null
			el.addEventListener("mousemove", 		function(e){ pointermove	(this, e) })
			el.addEventListener("mouseout", 		function( ){ pointerout		(this) })
			el.addEventListener("touchmove", 		function(e){ pointermove	(this, e.targetTouches[0]) })
			el.addEventListener("touchleave", 	function( ){ pointerout		(this) })
			el.addEventListener("touchcancel", 	function( ){ pointerout		(this) })
 

		}
	}
}