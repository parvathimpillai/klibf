<?php

namespace App\Filament\Admin\Resources\UserProfileResource\Pages;

use App\Filament\Admin\Resources\UserProfileResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\Auth;

class CreateUserProfile extends CreateRecord
{
    protected static string $resource = UserProfileResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $data['user_id'] = Auth::id();
        return $data;
    }

    // Save after each step
    protected function afterCreate(): void
    {
        $this->record->refresh();
    }

}
