<?php

namespace App\Filament\Admin\Resources\UserProfileResource\Pages;

use App\Filament\Admin\Resources\UserProfileResource;
use App\Models\UserProfile;
use Filament\Resources\Pages\Page;
use Illuminate\Support\Facades\Auth;

class ManageProfile extends Page
{
    protected static string $resource = UserProfileResource::class;

    protected static string $view = 'filament.resources.user-profile-resource.pages.manage-profile';

    public function mount(): void
    {
        $profile = UserProfile::firstWhere('user_id', Auth::id());

        if ($profile) {
            // redirect to edit
            $this->redirect(
                UserProfileResource::getUrl('edit', ['record' => $profile->getKey()])
            );
            return;
        }

        // redirect to create
        $this->redirect(UserProfileResource::getUrl('create'));
    }
}
