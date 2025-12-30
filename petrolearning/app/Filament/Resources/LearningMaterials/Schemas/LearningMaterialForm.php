<?php

namespace App\Filament\Resources\LearningMaterials\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class LearningMaterialForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Course Information')
                    ->schema([
                        TextInput::make('title')
                            ->label('Course Title')
                            ->required()
                            ->maxLength(255)
                            ->placeholder('e.g., Advanced React Patterns'),
                        
                        Select::make('category')
                            ->label('Category')
                            ->required()
                            ->options([
                                'Technical' => 'Technical',
                                'Safety' => 'Safety',
                                'Operations' => 'Operations',
                                'Management' => 'Management',
                                'Soft Skills' => 'Soft Skills',
                            ])
                            ->native(false),
                        
                        Select::make('level')
                            ->label('Difficulty Level')
                            ->required()
                            ->options([
                                'Beginner' => 'Beginner',
                                'Intermediate' => 'Intermediate',
                                'Advanced' => 'Advanced',
                            ])
                            ->native(false),
                        
                        Textarea::make('description')
                            ->label('Course Description')
                            ->rows(4)
                            ->maxLength(1000)
                            ->placeholder('Brief description of what this course covers...')
                            ->columnSpanFull(),
                    ])
                    ->columns(2),
                
                Section::make('Course Details')
                    ->schema([
                        TextInput::make('modules')
                            ->label('Number of Modules')
                            ->required()
                            ->numeric()
                            ->default(1)
                            ->minValue(1)
                            ->maxValue(100),
                        
                        TextInput::make('duration')
                            ->label('Duration')
                            ->placeholder('e.g., 2 hours, 3 days')
                            ->maxLength(50),
                        
                        TextInput::make('rating')
                            ->label('Rating')
                            ->numeric()
                            ->default(0)
                            ->minValue(0)
                            ->maxValue(5)
                            ->step(0.1)
                            ->suffix('/ 5'),
                    ])
                    ->columns(3),
                
                Section::make('Competency Target')
                    ->schema([
                        Select::make('competency_target')
                            ->label('Target Competency')
                            ->options([
                                'Technical Excellence' => 'Technical Excellence',
                                'Safety Awareness' => 'Safety Awareness',
                                'Operational Efficiency' => 'Operational Efficiency',
                                'Leadership' => 'Leadership',
                                'Communication' => 'Communication',
                                'Problem Solving' => 'Problem Solving',
                            ])
                            ->placeholder('Select target competency')
                            ->searchable()
                            ->native(false),
                    ]),
            ]);
    }
}
