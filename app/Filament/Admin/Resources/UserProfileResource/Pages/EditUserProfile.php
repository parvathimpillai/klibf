<?php

namespace App\Filament\Admin\Resources\UserProfileResource\Pages;

use App\Filament\Admin\Resources\UserProfileResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\Auth;

class EditUserProfile extends EditRecord
{
    protected static string $resource = UserProfileResource::class;

    public static function canEdit($record): bool
    {
        return $record->user_id === Auth::id();
    }

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        $data['user_id'] = Auth::id();
        return $data;
    }

    // Save immediately on step change
    protected function afterSave(): void
    {
        $this->notify('success', 'Profile updated automatically.');
    }
}
