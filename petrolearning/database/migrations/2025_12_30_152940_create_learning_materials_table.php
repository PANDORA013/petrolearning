<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('learning_materials', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('category');
            $table->string('level'); // Basic, Intermediate, Advanced
            $table->string('competency_target')->nullable();
            $table->decimal('rating', 2, 1)->default(0);
            $table->integer('modules')->default(0);
            $table->string('duration')->nullable(); // e.g., "12h"
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('learning_materials');
    }
};
