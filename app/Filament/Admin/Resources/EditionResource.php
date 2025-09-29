<?php

namespace App\Filament\Admin\Resources;

use App\Filament\Admin\Resources\EditionResource\Pages;
use App\Filament\Admin\Resources\EditionResource\RelationManagers;
use App\Models\Edition;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Facades\Auth;

class EditionResource extends Resource
{
    protected static ?string $model = Edition::class;

    protected static ?string $navigationIcon = 'heroicon-o-book-open';
    protected static ?string $navigationGroup = 'Content Management';
    protected static ?string $navigationLabel = 'Editions';

    public static function shouldRegisterNavigation(): bool
    {
        return Auth::check() && Auth::user()->hasRole('super admin');
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->maxLength(255),

                Forms\Components\Grid::make(2) // 2 columns
                    ->schema([
                        Forms\Components\DatePicker::make('from_date')
                            ->required()
                            ->label('From Date'),

                        Forms\Components\DatePicker::make('to_date')
                            ->required()
                            ->label('To Date')
                            ->rule(fn(callable $get) => 'after_or_equal:' . $get('from_date'))
                            ->validationMessages([
                                'after_or_equal' => 'The To Date must be greater than or equal to the From Date.',
                            ]),
                    ]),

                Forms\Components\Textarea::make('description')
                    ->rows(4)
                    ->nullable()
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('from_date')
                    ->date()
                    ->label('From'),
                Tables\Columns\TextColumn::make('to_date')
                    ->date()
                    ->label('To'),
                Tables\Columns\TextColumn::make('description')
                    ->limit(50)
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListEditions::route('/'),
            'create' => Pages\CreateEdition::route('/create'),
            'edit' => Pages\EditEdition::route('/{record}/edit'),
        ];
    }
}
