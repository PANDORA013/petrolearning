<?php

namespace App\Filament\Resources\Users\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Actions\DeleteAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class UsersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Full Name')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),
                
                TextColumn::make('email')
                    ->label('Email')
                    ->searchable()
                    ->sortable()
                    ->copyable()
                    ->icon('heroicon-o-envelope'),
                
                TextColumn::make('jabatan.nama_jabatan')
                    ->label('Position')
                    ->searchable()
                    ->sortable()
                    ->badge()
                    ->color('info'),
                
                TextColumn::make('departemen.nama_departemen')
                    ->label('Department')
                    ->searchable()
                    ->sortable()
                    ->badge()
                    ->color('warning'),
                
                TextColumn::make('score')
                    ->label('Score')
                    ->numeric()
                    ->sortable()
                    ->badge()
                    ->color(fn (int $state): string => match (true) {
                        $state >= 200 => 'success',
                        $state >= 150 => 'info',
                        $state >= 100 => 'warning',
                        default => 'danger',
                    })
                    ->formatStateUsing(fn (int $state): string => $state . ' pts')
                    ->description(fn (int $state): string => match (true) {
                        $state >= 200 => '🏆 Platinum',
                        $state >= 150 => '🥇 Gold',
                        $state >= 100 => '🥈 Silver',
                        default => '🥉 Bronze',
                    }),
                
                TextColumn::make('last_activity_date')
                    ->label('Last Active')
                    ->dateTime('d M Y H:i')
                    ->sortable()
                    ->since()
                    ->color(fn ($state) => now()->diffInDays($state) > 3 ? 'danger' : 'success')
                    ->icon(fn ($state) => now()->diffInDays($state) > 3 ? 'heroicon-o-exclamation-triangle' : 'heroicon-o-check-circle'),
                
                TextColumn::make('email_verified_at')
                    ->label('Verified')
                    ->dateTime('d M Y')
                    ->sortable()
                    ->toggleable()
                    ->placeholder('Not verified'),
                
                TextColumn::make('created_at')
                    ->label('Joined')
                    ->dateTime('d M Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('jabatan_id')
                    ->label('Position')
                    ->relationship('jabatan', 'nama_jabatan'),
                
                SelectFilter::make('departemen_id')
                    ->label('Department')
                    ->relationship('departemen', 'nama_departemen'),
                
                SelectFilter::make('score')
                    ->label('Tier')
                    ->options([
                        'platinum' => 'Platinum (200+)',
                        'gold' => 'Gold (150-199)',
                        'silver' => 'Silver (100-149)',
                        'bronze' => 'Bronze (<100)',
                    ])
                    ->query(function ($query, $state) {
                        return match ($state['value'] ?? null) {
                            'platinum' => $query->where('score', '>=', 200),
                            'gold' => $query->whereBetween('score', [150, 199]),
                            'silver' => $query->whereBetween('score', [100, 149]),
                            'bronze' => $query->where('score', '<', 100),
                            default => $query,
                        };
                    }),
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('score', 'desc');
    }
}
