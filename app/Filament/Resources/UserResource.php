<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages;
use App\Filament\Resources\UserResource\RelationManagers;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\TagsColumn;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Auth;
use Filament\Tables\Actions\Action;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use App\Notifications\PasswordResetNotification;
use Filament\Notifications\Notification;
use Filament\Notifications\Actions\Action as NotificationAction;

class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
    protected static ?string $navigationGroup = 'User Management';

    public static function shouldRegisterNavigation(): bool
    {
        return Auth::check() && Auth::user()->hasRole('super admin');
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('name')->required(),
                TextInput::make('email')->email()->required(),
                TextInput::make('phone')->required(),
                TextInput::make('password')
                    ->password()
                    ->dehydrateStateUsing(fn($state) => filled($state) ? bcrypt($state) : null)
                    ->required(fn(string $context): bool => $context === 'create')
                    ->visible(fn(string $context): bool => $context === 'create'),

                Select::make('roles')
                    ->multiple()
                    ->relationship('roles', 'name'),

                Select::make('permissions')
                    ->multiple()
                    ->relationship('permissions', 'name'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')->sortable()->searchable(),
                TextColumn::make('email')->sortable()->searchable(),
                TagsColumn::make('roles.name'),
                TagsColumn::make('permissions.name'),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),

                Action::make('resetPassword')
                    ->label('Reset Password')
                    ->requiresConfirmation()
                    ->color('warning')
                    ->icon('heroicon-o-key')
                    ->action(function ($record, $livewire) {
                        $newPassword = Str::random(12);

                        // Update user password
                        $record->update([
                            'password' => Hash::make($newPassword),
                        ]);

                        // Send email
                        $record->notify(new PasswordResetNotification($newPassword));

                        // 🔹 Show popup with password
                        Notification::make()
                            ->title('Password reset successfully')
                            ->body("New password: {$newPassword}")
                            ->success()
                            ->send();
                    }),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }
}
