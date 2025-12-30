<?php

namespace App\Filament\Resources\Users\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use App\Models\Jabatan;
use App\Models\Departemen;
use Illuminate\Support\Facades\Hash;

class UserForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('User Information')
                    ->schema([
                        TextInput::make('name')
                            ->label('Full Name')
                            ->required()
                            ->maxLength(255),
                        
                        TextInput::make('email')
                            ->label('Email Address')
                            ->email()
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true),
                        
                        TextInput::make('password')
                            ->password()
                            ->required(fn (string $context): bool => $context === 'create')
                            ->dehydrateStateUsing(fn ($state) => Hash::make($state))
                            ->dehydrated(fn ($state) => filled($state))
                            ->maxLength(255)
                            ->placeholder('Leave blank to keep current password'),
                    ])
                    ->columns(2),
                
                Section::make('Organization')
                    ->schema([
                        Select::make('jabatan_id')
                            ->label('Position (Jabatan)')
                            ->relationship('jabatan', 'nama_jabatan')
                            ->searchable()
                            ->preload()
                            ->native(false),
                        
                        Select::make('departemen_id')
                            ->label('Department')
                            ->relationship('departemen', 'nama_departemen')
                            ->searchable()
                            ->preload()
                            ->native(false),
                    ])
                    ->columns(2),
                
                Section::make('Gamification Stats')
                    ->schema([
                        TextInput::make('score')
                            ->label('Gamification Score')
                            ->numeric()
                            ->default(100)
                            ->minValue(0)
                            ->suffix('points')
                            ->helperText('User gamification score (affected by activity tracking)'),
                        
                        DateTimePicker::make('last_activity_date')
                            ->label('Last Activity')
                            ->native(false)
                            ->helperText('Auto-updated on each user activity'),
                        
                        DateTimePicker::make('email_verified_at')
                            ->label('Email Verified At')
                            ->native(false),
                    ])
                    ->columns(3)
                    ->collapsible(),
            ]);
    }
}
