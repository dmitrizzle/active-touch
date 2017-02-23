# active-touch
### Rewrite for browser :active touch and click states for links (to make your website feel like an app)

Here's what this thing does. CSS `:active` state for touch devices and even for good 'ol laptops is kind of ugly by default. This extremely lightweight JS file fixes that issue. Basically, every link that's clicked (has to be an anchor, `<a></a>`) gets an `-active` class when clicked or touched. That class presists unless another link is clicked, or if user scrolled or did any other action associated with cancelling the "click" or "tap". You can have a look at the guts; this has been developed with an assumption user is expecting the same kind of behaviour from the web app as from any native app.

The reason `-active` presists is because the user needs to see that what they have clicked is active, until the next view loads. If you want to clear all active links, just call `touchRespond.reset()` once the action has been completed.

## Why
The user gets a solid feel that their click or touch has activated something and it's working, unless they cancel the function (by clicking elsewhere, or you can set your own timeout). Default browser behaviour *might* just indicate that something on the page has been interacted with, but not whether it's actually active (as `:active` flag should really indicate).
