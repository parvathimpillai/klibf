<?php

namespace App\Filament\Admin\Resources;

use App\Filament\Admin\Resources\UserProfileResource\Pages;
use App\Models\UserProfile;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Illuminate\Support\Facades\Auth;
use Filament\Forms\Components\TextInput;

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
                Forms\Components\Wizard::make([
                    // Step 1: Organization details
                    Forms\Components\Wizard\Step::make('Organization')
                        ->schema([
                            Forms\Components\Section::make('Publishing House / Organization')
                                ->schema([
                                    TextInput::make('org_name')
                                        ->label('Name')
                                        ->required()
                                        ->minLength(3),

                                    TextInput::make('estb_year')
                                        ->label('Year of Establishment'),

                                    TextInput::make('reg_no')
                                        ->label('Registration No.'),

                                    TextInput::make('gst_no')
                                        ->label('GST No.'),

                                    TextInput::make('title_no')
                                        ->numeric()
                                        ->label('No. of Titles Published'),

                                    TextInput::make('book_lang')
                                        ->label('Language(s)'),

                                    Forms\Components\Select::make('org_nature')
                                        ->options([
                                            'P' => 'Publisher',
                                            'A' => 'Publisher & Distributor',
                                        ])
                                        ->required(),

                                    TextInput::make('mgr_house_name')
                                        ->label('Major Publishing House(s)')
                                        ->visible(fn($get) => $get('org_nature') === 'A'),
                                ])->columns(2),
                        ]),

                    // Step 2: Head of organization
                    Forms\Components\Wizard\Step::make('Head of Organization')
                        ->schema([
                            TextInput::make('head_org_name')->required(),
                            Forms\Components\Textarea::make('head_org_addr'),
                            TextInput::make('head_org_email')->email(),
                            TextInput::make('head_org_website')->url(),
                            TextInput::make('head_org_mobile'),
                        ])->columns(2),

                    // Step 3: Contact person
                    Forms\Components\Wizard\Step::make('Contact Person')
                        ->schema([
                            TextInput::make('cntct_prsn_name')->required(),
                            Forms\Components\Textarea::make('cntct_prsn_addr'),
                            TextInput::make('cntct_prsn_email')->email(),
                            TextInput::make('cntct_prsn_mobile'),
                            TextInput::make('cntct_prsn_watsapp')->label('WhatsApp No.'),
                        ])->columns(2),

                    // Step 4: Other details
                    Forms\Components\Wizard\Step::make('Other')
                        ->schema([
                            Forms\Components\FileUpload::make('logo')
                                ->directory('publisher_logos')
                                ->image()
                                ->maxSize(2048),

                            TextInput::make('fascia')->required(),
                            Forms\Components\Textarea::make('remarks'),
                        ]),
                ])
                    ->skippable() // allow users to skip steps (optional)
                    ->columnSpanFull(), // make the wizard span full width
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ManageProfile::route('/'),
            'create' => Pages\CreateUserProfile::route('/create'),
            'edit' => Pages\EditUserProfile::route('/{record}/edit'),
        ];
    }
}
