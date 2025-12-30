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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            
            // Kolom untuk relasi organisasi (nullable karena tabel master belum tentu ada)
            $table->unsignedBigInteger('jabatan_id')->nullable();
            $table->unsignedBigInteger('departemen_id')->nullable();
            
            // Kolom untuk gamifikasi
            $table->integer('score')->default(100);
            $table->timestamp('last_activity_date')->nullable();
            
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
