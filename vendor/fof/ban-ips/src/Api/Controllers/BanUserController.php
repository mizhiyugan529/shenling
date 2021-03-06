<?php

/*
 * This file is part of fof/ban-ips.
 *
 * Copyright (c) 2020 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace FoF\BanIPs\Api\Controllers;

use Flarum\Api\Controller\AbstractListController;
use FoF\BanIPs\Api\Serializers\BannedIPSerializer;
use FoF\BanIPs\Commands\BanUser;
use Illuminate\Contracts\Bus\Dispatcher;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class BanUserController extends AbstractListController
{
    /**
     * @var string
     */
    public $serializer = BannedIPSerializer::class;

    /**
     * @var Dispatcher
     */
    protected $bus;

    /**
     * @param Dispatcher $bus
     */
    public function __construct(Dispatcher $bus)
    {
        $this->bus = $bus;
    }

    /**
     * Get the data to be serialized and assigned to the response document.
     *
     * @param ServerRequestInterface $request
     * @param Document               $document
     *
     * @return mixed
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        return $this->bus->dispatch(
            new BanUser($request->getAttribute('actor'), array_get($request->getQueryParams(), 'id'), array_get($request->getParsedBody(), 'data'))
        );
    }
}
