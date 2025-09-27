<?php

namespace App\Filament\Admin\Resources;

use App\Filament\Admin\Resources\UserProfileResource\Pages;
use App\Models\UserProfile;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Illuminate\Support\Facades\Auth;

class UserProfileResource extends Resource
{
    protected static ?string $model = UserProfile::class;

    protected static ?string $navigationIcon = 'heroicon-o-user-circle';
    protected static ?string $navigationLabel = 'My Profile';
    protected static ?string $pluralModelLabel = 'Profile';

    public static function shouldRegisterNavigation(): bool
    {
        return Auth::check() && Auth::user()->hasRole('publisher');
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Publishing House / Organization')
                    ->schema([
                        Forms\Components\TextInput::make('org_name')->label('Name')->required()->minLength(3),
                        Forms\Components\TextInput::make('estb_year')->label('Year of Establishment'),
                        Forms\Components\TextInput::make('reg_no')->label('Registration No.'),
                        Forms\Components\TextInput::make('gst_no')->label('GST No.'),
                        Forms\Components\TextInput::make('title_no')->numeric()->label('No. of Titles Published'),
                        Forms\Components\TextInput::make('book_lang')->label('Language(s)'),
                        Forms\Components\Select::make('org_nature')
                            ->options([
                                'P' => 'Publisher',
                                'A' => 'Publisher & Distributor',
                            ])->required(),
                        Forms\Components\TextInput::make('mgr_house_name')
                            ->label('Major Publishing House(s)')
                            ->visible(fn($get) => $get('org_nature') === 'A'),
                    ])->columns(2),

                Forms\Components\Section::make('Head of Organization')
                    ->schema([
                        Forms\Components\TextInput::make('head_org_name')->required(),
                        Forms\Components\Textarea::make('head_org_addr'),
                        Forms\Components\TextInput::make('head_org_email')->email(),
                        Forms\Components\TextInput::make('head_org_website')->url(),
                        Forms\Components\TextInput::make('head_org_mobile'),
                    ])->columns(2),

                Forms\Components\Section::make('Contact Person')
                    ->schema([
                        Forms\Components\TextInput::make('cntct_prsn_name')->required(),
                        Forms\Components\Textarea::make('cntct_prsn_addr'),
                        Forms\Components\TextInput::make('cntct_prsn_email')->email(),
                        Forms\Components\TextInput::make('cntct_prsn_mobile'),
                        Forms\Components\TextInput::make('cntct_prsn_watsapp')->label('WhatsApp No.'),
                    ])->columns(2),

                Forms\Components\FileUpload::make('logo')
                    ->directory('publisher_logos')
                    ->image()->maxSize(2048),

                Forms\Components\TextInput::make('fascia')->required(),
                Forms\Components\Textarea::make('remarks'),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ManageProfile::route('/'),
        ];
    }
}
