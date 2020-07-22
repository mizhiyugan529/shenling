<?php

/*
 * This file is part of fof/links.
 *
 * Copyright (c) 2019 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Links;

use Flarum\Database\AbstractModel;

/**
 * @property int $id
 * @property string $title
 * @property string $url
 * @property int $position
 * @property bool $is_internal
 * @property bool $is_newtab
 * @property int $parent_id
 * @property Link $parent
 */
class Link extends AbstractModel
{
    /**
     * {@inheritdoc}
     */
    protected $table = 'links';

    /**
     * @var array
     */
    protected $casts = [
        'is_internal' => 'boolean',
        'is_newtab'   => 'boolean',
    ];

    /**
     * Create a new link.
     *
     * @param string $name
     * @param string $url
     * @param bool   $isInternal
     * @param bool   $isNewtab
     *
     * @return static
     */
    public static function build($name, $url, $isInternal, $isNewtab)
    {
        $link = new static();

        $link->title = $name;
        $link->url = $url;
        $link->is_internal = (bool) $isInternal;
        $link->is_newtab = (bool) $isNewtab;

        return $link;
    }

    public function parent()
    {
        return $this->belongsTo(self::class);
    }
}
