<?php

namespace App\Filament\Admin\Resources\UserProfileResource\Pages;

use App\Filament\Admin\Resources\UserProfileResource;
use Filament\Resources\Pages\Page;
use App\Models\UserProfile;
use Filament\Resources\Pages\EditRecord;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\Auth;

class ManageProfile extends EditRecord
{
    protected static string $resource = UserProfileResource::class;

    public function mount($record = null): void
    {
        $profile = UserProfile::where('user_id', Auth::id())->first();

        if (!$profile) {
            // If no profile exists → redirect to create
            // $this->redirect(CreateProfile::getUrl());
        } else {
            // Otherwise edit existing one
            $this->record = $profile;
            parent::mount($profile->getKey());
        }
    }
}

