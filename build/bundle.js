(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(["exports"], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports);
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports);
		global.index = mod.exports;
	}
})(this, function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// REWRITE TOUCH AND CLICK ACTIVE STATES FOR ".--active" CSS class
	var activeTouch = exports.activeTouch = {
		// sensitivity settings
		options: {
			touchMoveDelay: 200, // wait this many ms to see if the user is about to scroll or tap the element
			slack: 35, // allow dragging this many px before deactivating the element state
			selectors: ["a"] },

		// remove all other active states on the document
		reset: function reset() {
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = document.querySelectorAll(this.options.selectors[0])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var el = _step.value;
					el.classList.remove("--active");
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		},

		// add events to all elements on page
		init: function init() {
			var _this = this;

			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				var _loop = function _loop() {
					el = _step2.value;

					var pointerDown = false;
					var activeAvailable = true;
					var pointerLocFirst = {};
					var pointerLocLast = {};
					var touchMoveTimer = -1;

					var touchMoveDelay = _this.options.touchMoveDelay;
					var slack = _this.options.slack;

					// add/remove active classes
					var activate = function activate(el) {
						return el.classList.add("--active");
					};
					var deactivate = function deactivate(el) {
						el.classList.remove("--active");activeAvailable = false;
					};

					// allow dragging and still keeping element active for [slack] pixels
					var outsideRange = function outsideRange(a, b) {
						var getX = function getX(o) {
							return typeof o.clientX !== 'undefined' ? o.clientX : o.pageX;
						};
						var getY = function getY(o) {
							return typeof o.clientY !== 'undefined' ? o.clientY : o.pageY;
						};
						var withinRange = function withinRange(n1, n2) {
							if (n1 - slack <= n2 && n2 - slack <= n1) return true;else return false;
						};

						if (withinRange(getX(a), getX(b)) && withinRange(getY(a), getY(b))) return false;else return true;
					};

					// activate down state
					var downstate = function downstate(el, e) {
						activeAvailable = true;
						activate(el);
						pointerDown = true;
						pointerLocFirst = e;
					};
					var upstate = function upstate(el) {
						if (pointerDown && activeAvailable) {
							_this.reset();
							activate(el);
						}
						pointerDown = false;
					};

					el.addEventListener("mousedown", function (e) {
						downstate(this, e);
					});
					el.addEventListener("mouseup", function () {
						upstate(this);
					});

					el.addEventListener("touchstart", function (e) {
						if (e.touches.length == 1) {
							activeAvailable = true;
							pointerDown = true;
							var _el = this(_touchMoveTimer != -1) ? clearTimeout(_touchMoveTimer) : null;

							// timeout function that doesn't add the class until delay [touchMoveDelay] has passed
							var _touchMoveTimer = setTimeout(function () {
								return activeAvailable ? downstate(self, e.touches[0]) : null;
							}, touchMoveDelay);
						}
					});
					el.addEventListener("touchend", function () {
						upstate(this);
					});

					// deactivate down state
					var pointermove = function pointermove(el, e) {
						if (activeAvailable) {
							var _pointerLocLast = e;
							if (pointerDown && outsideRange(pointerLocFirst, _pointerLocLast)) {
								deactivate(el);
								pointerDown = false;
							}
						}
					};
					var pointerout = function pointerout(el) {
						return pointerDown && activeAvailable ? deactivate(el) : null;
					};
					el.addEventListener("mousemove", function (e) {
						pointermove(this, e);
					});
					el.addEventListener("mouseout", function () {
						pointerout(this);
					});
					el.addEventListener("touchmove", function (e) {
						pointermove(this, e.targetTouches[0]);
					});
					el.addEventListener("touchleave", function () {
						pointerout(this);
					});
					el.addEventListener("touchcancel", function () {
						pointerout(this);
					});
				};

				for (var _iterator2 = document.querySelectorAll(this.options.selectors)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var el;

					_loop();
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}
		}
	};
});