<?php

/*
 * This file is part of flarumalshain/showlastpost.
 *
 * Copyright (c) 2020 FlarumAlshain.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace FlarumAlshain\ShowLastPost;

use Flarum\Extend;
use Illuminate\Contracts\Events\Dispatcher;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/resources/less/forum.less'),
    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js'),
    function (Dispatcher $events) {
        $events->subscribe(Listeners\AddApiAttributes::class);
        $events->subscribe(Listeners\LoadUserSettings::class);

    }
];
