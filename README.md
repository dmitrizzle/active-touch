# This project is dormant.
If you understand the issue and have a lighter, less buggy solution you are more than welcome to contribute. However, at this time I find the problem isn't worth solving for me personally. Considering how much effort is required to fix something as trivial as default style behaviours on different devices.

***

## active-touch ☝️
### A solution for :active CSS problem on iOS devices

There are 3 problems with how iOS treats CSS `:active` state:

1. By default it's ignored, instead `-webkit-tap-highlight-color` is used.
1. You can overwrite above with your own CSS but it doesn't give you any actual control over style except the color itself (and it behaves awfully).
1. You can try to use hacks like `<body ontouchstart>` but it won't fix everything:
	* If you touch and hold your link and scroll your page, it'll be highlighted. This looks awful if you have a list of large buttons/links that you need to scroll. You'll be stuck with a scrollable list where a bunch of items have `:active`... very ugly.
	* If you click or touch a button or a link and move the finger or cursor off its boundaries (while the finger or mouse button is pressed) the link will not cancel `:active`. Also ugly.

### Why owuld you want to mess with `:active` state anyway?
Even if you have super-fast single-page application, users still want **INSTANT** feedback when they click/tap your links and buttons, in fact here's what's expected for first-class app experience:
1. User pressed the button - style changes immediately to signify the "downstate"
1. User lifted her finger or released mouse button - the styles changes again to an "upstate" (default) or another style that indicates user's location within the app.

For example, if a user presses a white button (immediately it turns dark) and releases it (it may remain dark) some page loads and the button turns blue to indicate that she is on the page that corresponds to that button.

## How does this work
This library solves the issues within one of the most popular mobile browser (iOS Safari) [as well many others] by adding `active` class for every `<a>` tag on the page as soon as the user touches them. If the user scrolls or moves the finger away, class is removed. If the user lifts his finger/releases mouse button the `active` class remains. This part you can control by calling `activeTouch.reset()` - which will remove that class. 🎉

### Installation (NPM):
`npm install --save active-touch`

### API (how to use this thing):
For ES6 projects with Babel:

```javascript

import { activeTouch } from "active-touch"

activeTouch.reset() // call this function every time you need to remove all `active` classes (like when new page is loaded)
activeTouch.init()	// init the touch/click listener functions

```
By default **active-touch** iterates through all anchor (link) elements on the page and toggles class "active". You can change that behaviour when you initialize:

```javascript
activeTouch.init({
	cssclass: "custom-class",
	selectors: ["a", "button", ".another-selector"]
})
```
^^ Now, `.custom-class` will be toggled on link (`<a></a>`), button (`<button/>`) and all elements with css class `another-selector` that the user presses their finger/mouse button.

## Don't forget:
Create your own `.active{}` CSS style, for example: `.active { background: green }`

### React.js
If you are using React, activeTouch should be called once everything has rendered inside your component, with `compoentDidMount()` like so:
```javascript
class App extends React.Component {
	componentDidMount() {
      activeTouch.reset()
	 		activeTouch.init()
  }
  render() {
		return ( <div><a href="#">link</a></div> )
	}
}
```


### Projects that don't use Babel or any build tools can do this:

In your HTML file, import the compiled JS:
```html
<script src="path-to/active-touch/build/bundle.js"></script>
```

In your JavaScript, use this:
```javascript
if(typeof ES6test == "undefined"){
	(function (global, factory) {
		if (typeof define === "function" && define.amd) {
			define(["./index.js"], factory);
		} else if (typeof exports !== "undefined") {
			factory(require("./index.js"));
		} else {
			var mod = {
				exports: {}
			};
			factory(global.index);
			global.test = mod.exports;
		}
	})(this, function (_index) {
		"use strict";
				
		// init the touch/click listener functions
		_index.activeTouch.init();

	});
}
```
