<?php

namespace App\Filament\Resources\LearningMaterials\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class LearningMaterialsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')
                    ->label('Course Title')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),
                
                TextColumn::make('category')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Technical' => 'info',
                        'Safety' => 'danger',
                        'Operations' => 'warning',
                        'Management' => 'success',
                        'Soft Skills' => 'gray',
                        default => 'gray',
                    })
                    ->searchable()
                    ->sortable(),
                
                TextColumn::make('level')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Beginner' => 'success',
                        'Intermediate' => 'warning',
                        'Advanced' => 'danger',
                        default => 'gray',
                    })
                    ->searchable()
                    ->sortable(),
                
                TextColumn::make('competency_target')
                    ->label('Target Competency')
                    ->searchable()
                    ->toggleable(),
                
                TextColumn::make('rating')
                    ->numeric(decimalPlaces: 1)
                    ->sortable()
                    ->suffix(' ⭐'),
                
                TextColumn::make('modules')
                    ->label('Modules')
                    ->numeric()
                    ->sortable()
                    ->suffix(' modules'),
                
                TextColumn::make('duration')
                    ->searchable()
                    ->toggleable(),
                
                TextColumn::make('created_at')
                    ->label('Created')
                    ->dateTime('d M Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                
                TextColumn::make('updated_at')
                    ->label('Updated')
                    ->dateTime('d M Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('category')
                    ->options([
                        'Technical' => 'Technical',
                        'Safety' => 'Safety',
                        'Operations' => 'Operations',
                        'Management' => 'Management',
                        'Soft Skills' => 'Soft Skills',
                    ]),
                
                SelectFilter::make('level')
                    ->options([
                        'Beginner' => 'Beginner',
                        'Intermediate' => 'Intermediate',
                        'Advanced' => 'Advanced',
                    ]),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }
}
