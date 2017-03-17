# active-touch ☝️
### A solution for :active CSS problem on iOS devices

There are 3 problems with how iOS treats CSS `:active` state:
1. By default it's ignored, instead `-webkit-tap-highlight-color` is used
1. You can overwrite above with your own CSS but it doesn't give you any actual control over style except the color itself (and it behaves awfully, compared to the way you'd expect it to)
1. You can try to use hacks like `<body ontouchstart>` but it won't place that nice. If you touch and hold your link and scroll your page, it'll be highlighted. This looks awful if you have a list of large buttons that you need to scroll. For user it'll feel confusing as they will see an immediate downstate for their button/link which will not cancel even if they scroll (downstates are expected to cancel when users scroll pages or move cursor away from the button)

### Why owuld you want to mess with :active state anyway?
Even if you have super-fast single-page application, users still want feedback when they click your links and buttons, in fact there needs to be two states:
1. User pressed the button - immediately the style changes
1. User lifted her finger or released mouse button - the styles changes again either to "activated (I'm here)" or back to original

## How does this work
This library solves the issues within one of the most popular mobile browser (iOS Safari) by adding `--active` class for every link and button on the page as soon as the user touches the button. If the user scrolls or moves the finger away, class is removed. If the user lifts his finger/releases mouse button the class is removed. 🎉

### Installation 
Soon.
