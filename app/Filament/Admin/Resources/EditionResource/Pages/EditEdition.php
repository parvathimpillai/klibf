<?php

namespace App\Filament\Admin\Resources\EditionResource\Pages;

use App\Filament\Admin\Resources\EditionResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditEdition extends EditRecord
{
    protected static string $resource = EditionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
