<?php

namespace App\Filament\Pages\Auth;

use Filament\Forms\Components\TextInput;
use Filament\Pages\Auth\Register as BaseRegister;
use Illuminate\Support\Facades\Auth;

class Register extends BaseRegister
{
    protected static string $view = 'filament.pages.auth.register';

    protected static bool $shouldRegisterNavigation = false;

    public function mount(): void
    {
        if (!Auth::check() || Auth::user()->role !== 'super admin') {
            abort(403, 'Unauthorized');
        }
        parent::mount();
        parent::mount();
    }

    protected function getFormSchema(): array
    {
        return [
            TextInput::make('name')
                ->required()
                ->maxLength(255),
            TextInput::make('email')
                ->email()
                ->required()
                ->maxLength(255)
                ->unique(),
            TextInput::make('phone')
                ->tel()
                ->required()
                ->maxLength(20)
                ->placeholder('Enter your phone number'),
            TextInput::make('password')
                ->password()
                ->required()
                ->minLength(8)
                ->confirmed(),
            TextInput::make('password_confirmation')
                ->password()
                ->required()
                ->dehydrated(false),
        ];
    }
}
