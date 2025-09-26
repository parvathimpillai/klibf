<?php

namespace App\Filament\Pages;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Pages\Page;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;
use Filament\Notifications\Notification;

class ChangePassword extends Page implements Forms\Contracts\HasForms
{
    use Forms\Concerns\InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-key';
    protected static string $view = 'filament.pages.change-password';

    public ?string $current_password = '';
    public ?string $new_password = '';
    public ?string $new_password_confirmation = '';

    public function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('current_password')
                ->password()
                ->required()
                ->label('Current Password'),

            Forms\Components\TextInput::make('new_password')
                ->password()
                ->required()
                ->label('New Password')
                ->rule('min:8'),

            Forms\Components\TextInput::make('new_password_confirmation')
                ->password()
                ->required()
                ->label('Confirm New Password')
                ->same('new_password'),
        ]);
    }

    public function save(): void
    {
        $user = Auth::user();

        if (!Hash::check($this->current_password, $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => 'Your current password is incorrect.',
            ]);
        }

        $user->update([
            'password' => Hash::make($this->new_password),
        ]);

        $this->reset(['current_password', 'new_password', 'new_password_confirmation']);

        Notification::make()
            ->title('Password updated successfully!')
            ->success()
            ->send();
    }

    public static function shouldRegisterNavigation(): bool
    {
        return false; // hide from sidebar
    }
}
