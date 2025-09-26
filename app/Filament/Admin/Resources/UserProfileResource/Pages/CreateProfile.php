<?php

namespace App\Filament\Admin\Resources\UserProfileResource\Pages;

use App\Filament\Admin\Resources\UserProfileResource;
use Filament\Resources\Pages\Page;

class CreateProfile extends Page
{
    protected static string $resource = UserProfileResource::class;

    protected static string $view = 'filament.admin.resources.user-profile-resource.pages.create-profile';
}
