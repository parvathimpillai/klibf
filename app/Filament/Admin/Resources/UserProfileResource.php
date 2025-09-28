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
                    Forms\Components\Wizard\Step::make('Organization')
                        ->schema([
                            Forms\Components\TextInput::make('org_name')
                                ->label('Organisation Name')
                                ->default(fn() => Auth::user()->name)
                                ->required()
                                ->minLength(3)
                                ->live(debounce: 500), // auto-update when typing
                            Forms\Components\TextInput::make('estb_year')->label('Year of Establishment'),
                            Forms\Components\TextInput::make('reg_no')->label('Registration No.'),
                            Forms\Components\TextInput::make('gst_no')->label('GST No.'),
                            Forms\Components\TextInput::make('title_no')
                                ->numeric()
                                ->label('No. of Titles Published'),
                            Forms\Components\TextInput::make('book_lang')->label('Language(s)'),
                            Forms\Components\Select::make('org_nature')
                                ->label('Organisation Nature')
                                ->options([
                                    'P' => 'Publisher',
                                    'D' => 'Publisher & Distributor',
                                ])
                                ->required()
                                ->live(),
                            Forms\Components\TextInput::make('major_house_name')
                                ->label('Major Publishing House(s)')
                                ->visible(fn($get) => $get('org_nature') === 'D'),
                            Forms\Components\Textarea::make('org_addr')->label('Address'),
                            Forms\Components\TextInput::make('org_email')
                                ->label('e-Mail Id')
                                ->email()
                                ->default(fn() => Auth::user()->email),
                            Forms\Components\TextInput::make('org_website')
                                ->url()
                                ->label('Website URL (If Any)'),
                            Forms\Components\TextInput::make('org_mobile')
                                ->default(fn() => Auth::user()->phone)
                                ->label('Phone No'),
                        ])->columns(2),

                    // Forms\Components\Wizard\Step::make('Head of Organization')
                    //     ->schema([
                    //         Forms\Components\TextInput::make('head_org_name')->required(),
                    //         Forms\Components\Textarea::make('head_org_addr'),
                    //         Forms\Components\TextInput::make('head_org_email')
                    //             ->email()
                    //             ->default(fn() => Auth::user()->email),
                    //         Forms\Components\TextInput::make('head_org_website')->url(),
                    //         Forms\Components\TextInput::make('head_org_mobile')->default(fn() => Auth::user()->phone),
                    //     ])->columns(2),

                    Forms\Components\Wizard\Step::make('Contact Person')
                        ->schema([
                            Forms\Components\TextInput::make('cntct_prsn_name')
                                ->required()
                                ->label('Name'),
                            Forms\Components\TextInput::make('cntct_prsn_desig')
                                ->required()
                                ->label('Designation'),
                            // Forms\Components\Textarea::make('cntct_prsn_addr'),
                            Forms\Components\TextInput::make('cntct_prsn_mobile')
                                ->default(fn() => Auth::user()->phone)
                                ->Label('Mobile No'),
                            Forms\Components\TextInput::make('cntct_prsn_whatsapp')
                                ->label('WhatsApp No.')
                                ->default(fn() => Auth::user()->phone),
                            Forms\Components\TextInput::make('cntct_prsn_email')
                                ->email()
                                ->default(fn() => Auth::user()->email)
                                ->label('e-Mail Id'),
                        ])->columns(2),

                    Forms\Components\Wizard\Step::make('Other')
                        ->schema([
                            Forms\Components\FileUpload::make('logo')
                                ->directory('publisher_logos')
                                ->image()
                                ->maxSize(2048),

                            Forms\Components\TextInput::make('fascia')->required(),
                            Forms\Components\Textarea::make('remarks'),
                        ]),
                ])
                    ->skippable()
                    ->persistStepInQueryString() // keeps track of current step
                    ->columnSpanFull(),
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
