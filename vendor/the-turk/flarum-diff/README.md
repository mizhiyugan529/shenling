# Diff for Flarum

[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/the-turk/flarum-diff/blob/master/LICENSE) [![Latest Stable Version](https://img.shields.io/packagist/v/the-turk/flarum-diff.svg)](https://packagist.org/packages/the-turk/flarum-diff) [![Total Downloads](https://img.shields.io/packagist/dt/the-turk/flarum-diff.svg)](https://packagist.org/packages/the-turk/flarum-diff)

This extension adds a "post revision history" feature to your [Flarum](https://github.com/flarum) forum. I did this one for my personal Flarum project and decided to share it.

Screenshots:

![Diff Collage](https://i.ibb.co/FJywHKn/rsz-diff-collage.png)

- [Post-Stream Item](https://i.ibb.co/4m21pnM/post-Stream-Item.png)
- [Dropdown List](https://i.ibb.co/PTTcWCw/dropdown-List.png)

## Features

- Based on [jfcherng/php-diff](https://github.com/jfcherng/php-diff) repository (this one is forked from [chrisboulton/php-diff](https://github.com/chrisboulton/php-diff) since it's no longer maintained).
- Option for **line** (default), **word** and **char** level diffs.
- Three render modes including "Inline", "Side By Side" & "Combined".
- Archive old revisions using cron jobs or manually.
- Delete revisions or rollback to certain revision.
- Supports `fof/nightmode`, `the-turk/flarum-quiet-edits`.
- Supports all browsers which are supporting [css-grid](https://caniuse.com/#feat=css-grid).

Also, it won't load (and cache) anything until you click the "Edited" button so no need to worry about loading times.

## Requirements

![php](https://img.shields.io/badge/php-%5E7.1.3-blue?style=flat-square) ![ext-iconv](https://img.shields.io/badge/ext-iconv-brightgreen?style=flat-square)

You can check your php version by running `php -v` and check if `iconv` is installed by running `php --ri iconv` (which should display `iconv support => enabled`).

You also need to update `s9e/text-formatter` to v2.3.7 for syntax highlighting in "Preview" mode (**skip this step** if you didn't update `flarum/core` to beta 12 yet):

```
composer update s9e/text-formatter:2.3.7
```

## Conflictions

This extension conflicts with:

- [dem13n/nickname-changer](https://discuss.flarum.org/d/21238-nickname-changer) package. Use [fof/username-request](https://discuss.flarum.org/d/20956-friendsofflarum-username-request) instead.

- If you're using [the-turk/flarum-edit-notifications](https://discuss.flarum.org/d/22896-edit-notifications/17), you should update it to v0.1.4
```bash
composer update the-turk/flarum-edit-notifications:0.1.4
```

## Installation

Use [Bazaar](https://discuss.flarum.org/d/5151) or install manually:

```bash
composer require the-turk/flarum-diff
```

## Updating

```bash
composer update the-turk/flarum-diff
php flarum migrate
php flarum cache:clear
```

## Usage

Enable the extension and set the permissions. You're ready to go!

### Archive Old Revisions

If **x ≥ A** (where the **x** is post's revision count), first **y=mx+b** revisions for the post can be stored as merged & compressed `BLOB` in a new table (which is called `post_edit_histories_archive`). Specify the **A**, **m** and **b** from the settings modal. Float values of **y** will be rounded to the next lowest integer value. It's recommended to archive old revisions if you want to save storage volume but **_not recommended if you don't want to_**.

If you want to archive old revisions, please consider enabling _cron job option_ from the settings modal. I set a weekly cron job which is working on sundays at 02:00 AM (nothing special) using `diff:archive` command**. Otherwise, it'll try to find & archive old revisions for the post as soon as `Post\Revised` event fires or wait for your `php flarum diff:archive` command.

> **: Here is the only Cron entry you need to add to your (Linux) server:
>
> `* * * * * php /<path/to/flarum>/flarum schedule:run >> /dev/null 2>&1`
>
> This Cron will call the Laravel command scheduler every minute. Then, Laravel evaluates your scheduled tasks and runs the tasks that are due.

## Links

- [Flarum Discuss post](https://discuss.flarum.org/d/22779-diff-for-flarum)
- [Source code on GitHub](https://github.com/the-turk/flarum-diff)
- [Changelog](https://github.com/the-turk/flarum-diff/blob/master/CHANGELOG.md)
- [Report an issue](https://github.com/the-turk/flarum-diff/issues)
- [Download via Packagist](https://packagist.org/packages/the-turk/flarum-diff)
