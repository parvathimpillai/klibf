<?php

namespace App\Filament\Admin\Resources\UserProfileResource\Pages;

use App\Filament\Admin\Resources\UserProfileResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Support\Facades\Auth;

class ListUserProfiles extends ListRecords
{
    protected static string $resource = UserProfileResource::class;

    protected function getHeaderActions(): array
    {
        return []; // removes the "Create" button
    }

    public function mount(): void
    {
        $profile = \App\Models\UserProfile::where('user_id', Auth::id())->first();

        if ($profile) {
            $this->redirect(UserProfileResource::getUrl('edit', ['record' => $profile]));
        } else {
            $this->redirect(UserProfileResource::getUrl('create'));
        }
    }
}
