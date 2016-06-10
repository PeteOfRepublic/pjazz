# PJAZZ

Pronouned: [puh-jaz]

## What is it?

A really simple lightweight SPA library for faking your way to greatness. No, really. It just grabs the pages at the other end of the link and replaces the target element ID or current body tag with the content or body from the target page. That's it.

## Why?

There are other libraries out there that do the same thing (PJAX) but I wanted something even lighter that would be super simple to install and get going with.

## Notes

Watch this space…

## Bugs

Going by my own advice of "Solve your own problem first" I have ensured that this library works on my development machine. If you find a bug or just want to mention something that doesn't work for you give me a description of the issue, your OS and browser combo on [the github page](http://github.com/Flowdeeps/PJazz/issues)

## TODO
* Get progress from the server on how long a file will take and then
* Feed the progress to the momentum library
* Check to see if the link's host matches window.host - I imagine that's a can of worms
* Support folder hierarchies for the push history - I don't think that's too much work

### Thanks

I spent an age trying to find a vanilla method for jQuery's native parseHTML() until I found the fantastic resource [YouMightNotNeedJquery](http://youmightnotneedjquery.com/) which suggested using a temporary html document in memory which could then be traversed like a traditional node tree. I owe you a beer for steering me away from fixing the entire innerHTML of the source with regex and replace!

## License
MIT
