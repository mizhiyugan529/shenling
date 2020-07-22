# Fickle
Add a message, announcement, quote, whatever, towards the top of your Flarum forum, which is, well, fickle. It will show when someone first enters your forum, but as soon as they click on a post, it goes away and won't come back until a full page refresh is done. This means it is less annoying, yet will continually remind users about something important as they come back to the forum. Even then, it's small and not too much in your face. Unless you style yours that way.
There are no admin settings. The forum owner must update a text file manually. You will see which file after you install/update and visit your homepage. 

## Install

`composer require zerosonesfun/flarum-ext-fickle-announcement`

## Upgrade

~~~
composer update zerosonesfun/flarum-ext-fickle-announcement
php flarum cache:clear
~~~
- Also, clear your browser cache and cookies.
- Also, clear things like your cloudflare cache if you are using a service like that.
- Basically, clear everything after an upgrade.
