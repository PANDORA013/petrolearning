<?php

namespace App\Filament\Resources\Jabatans\Pages;

use App\Filament\Resources\Jabatans\JabatanResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewJabatan extends ViewRecord
{
    protected static string $resource = JabatanResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
