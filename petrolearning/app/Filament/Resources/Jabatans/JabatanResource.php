<?php

namespace App\Filament\Resources\Jabatans;

use App\Filament\Resources\Jabatans\Pages\CreateJabatan;
use App\Filament\Resources\Jabatans\Pages\EditJabatan;
use App\Filament\Resources\Jabatans\Pages\ListJabatans;
use App\Filament\Resources\Jabatans\Pages\ViewJabatan;
use App\Filament\Resources\Jabatans\Schemas\JabatanForm;
use App\Filament\Resources\Jabatans\Schemas\JabatanInfolist;
use App\Filament\Resources\Jabatans\Tables\JabatansTable;
use App\Models\Jabatan;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class JabatanResource extends Resource
{
    protected static ?string $model = Jabatan::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedBriefcase;

    protected static ?string $recordTitleAttribute = 'nama_jabatan';
    
    protected static ?string $navigationLabel = 'Positions';
    
    protected static ?string $modelLabel = 'Position';
    
    protected static ?string $pluralModelLabel = 'Positions';
    
    protected static ?int $navigationSort = 3;

    public static function form(Schema $schema): Schema
    {
        return JabatanForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return JabatanInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return JabatansTable::configure($table);
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
            'index' => ListJabatans::route('/'),
            'create' => CreateJabatan::route('/create'),
            'view' => ViewJabatan::route('/{record}'),
            'edit' => EditJabatan::route('/{record}/edit'),
        ];
    }
}
