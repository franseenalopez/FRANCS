<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected static function boot()
    {
        parent::boot();

        static::updated(function ($product) {
            if ($product->wasChanged('stock')) {
                \App\Models\Activity::create([
                    'description' => 'Product stock updated',
                    'subject_type' => get_class($product),
                    'subject_id' => $product->id,
                    'causer_type' => auth()->check() ? get_class(auth()->user()) : null,
                    'causer_id' => auth()->id(),
                    'properties' => json_encode([
                        'name' => $product->name,
                        'old_stock' => $product->getOriginal('stock'),
                        'new_stock' => $product->stock
                    ]),
                ]);
            }
        });

        static::created(function ($product) {
             \App\Models\Activity::create([
                'description' => 'New product added',
                'subject_type' => get_class($product),
                'subject_id' => $product->id,
                'causer_type' => auth()->check() ? get_class(auth()->user()) : null,
                'causer_id' => auth()->id(),
                'properties' => json_encode(['name' => $product->name]),
            ]);
        });
    }

    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'description',
        'price',
        'stock',
        'image',
        'images',
        'is_active',
        'is_featured'
    ];

    protected $casts = [
        'images' => 'array',
        'price' => 'decimal:2',
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        if (!$this->image) {
            return null;
        }
        
        // If it's already a complete URL, return it
        if (str_starts_with($this->image, 'http')) {
            return $this->image;
        }

        try {
            return \Illuminate\Support\Facades\Storage::url($this->image);
        } catch (\Throwable $e) {
            // Log the error if needed: \Illuminate\Support\Facades\Log::error("Cloudinary image missing: " . $this->image);
            return null; // Or return a default placeholder image URL
        }
    }
}
