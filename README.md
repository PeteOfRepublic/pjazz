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
* Check to see if the link's host matches window.host - I imagine that's a can of worms
* Support folder hierarchies for the push history - I don't think that's too much work
* Support nested folders for content loading - currently doesn't work if content isn't at site root
* Investigate possibility of loading content on individual link

### Thanks

I spent an age trying to find a vanilla method for jQuery's native parseHTML() until I found the fantastic resource [YouMightNotNeedJquery](http://youmightnotneedjquery.com/) which suggested using a temporary html document in memory which could then be traversed like a traditional node tree. I owe you a beer for steering me away from fixing the entire innerHTML of the source with regex and replace!

Speedboost tips (what's the point in being lightweight if you're not fast as well?) from [10 Javascript Performance Boosting Tips from Nicholas Zakas](http://jonraasch.com/blog/10-javascript-performance-boosting-tips-from-nicholas-zakas)

David Walsh pointed me in the right direction for getting [CSS pseudo element values programmatically](https://davidwalsh.name/pseudo-element) (even though I didn't end up using it in the end…)

[Pankaj Parashar](https://pankajparashar.com/posts/modify-pseudo-elements-css/) for changing CSS values in memory and keeping my CSS nice and clean.

Of course, the Mozilla Developer Network for all the amazing advice on how to handle the AJAX data and *when*.

## License
MIT
