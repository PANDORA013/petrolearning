<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Direktorat extends Model
{
    protected $fillable = ['nama_direktorat'];

    public function kompartemens(): HasMany
    {
        return $this->hasMany(Kompartemen::class);
    }
}

