<?php

namespace App\Filament\Resources\Jabatans\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class JabatanInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('bagian_id')
                    ->numeric(),
                TextEntry::make('nama_jabatan'),
                TextEntry::make('grade_level')
                    ->numeric(),
                TextEntry::make('created_at')
                    ->dateTime(),
                TextEntry::make('updated_at')
                    ->dateTime(),
            ]);
    }
}
