# PJAZZ

Pronouned: [puh-jaz]

## What is it?

A really simple lightweight SPA library for faking your way to greatness. No, really. It just grabs the pages at the other end of the link and replaces the target element ID or current body tag with the content or body from the target page. That's it.

## Why?

There are other libraries out there that do the same thing (PJAX) but I wanted something even lighter that would be super simple to install and get going with.

## Notes

Watch this space…

## It's Not Working For Me!

Going by my own advice of "Solve your own problem first" I have ensured that this library works on my development machine. If you haven't got a recent browser or an up-to-date OS then I'm probably not going to fix it for you. That said if you are up-to-date with those things and it's still not working create a bug for me at http://github.com/Flowdeeps/PJazz#issues

## TODO
* Get progress from the server on how long a file will take
* Feed the progress to the momentum library
* Add a way of excluding links from PJAZZ

### Thanks

I spent an age trying to find a vanilla method for jQuery's native parseHTML() until I found the fantastic resource [YouMightNotNeedJquery](http://youmightnotneedjquery.com/) which suggested using a temporary html document in memory which could then be traversed like a traditional node tree. I owe you a beer for steering me away from fixing the entire innerHTML of the source with regex and replace!

## License
MIT
