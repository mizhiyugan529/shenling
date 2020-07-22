<?php
/* This is part of the jordanjay/flarum-ext-summaries project.
 *
 * Code (c)2019 Jordan Schnaidt
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FlarumAlshain\ShowLastPost\Listeners;

use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Api\Event\Serializing;
use Flarum\Api\Serializer\ForumSerializer;

class LoadUserSettings
{
    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }
    /**
     * Listen for the setting we need.
     *
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(Serializing::class, [$this, 'load']);
    }

    /**
     * Send the setting on to the frontend
     *
     * @param Serializing $event
     */
    public function load(Serializing $event)
    {
        if ($event->isSerializer(ForumSerializer::class)) {
            $event->attributes['flarumalshain-showlastpost.excerpt_length'] = $this->settings->get('flarumalshain-showlastpost.excerpt_length');
        }
    }
}
