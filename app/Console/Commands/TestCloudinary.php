<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Support\Facades\Config;

class TestCloudinary extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:cloudinary';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test Cloudinary integration by uploading a sample image';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting Cloudinary connection test...');

        // Check credentials from config
        $cloudName = Config::get('filesystems.disks.cloudinary.cloud_name') ?? env('CLOUDINARY_CLOUD_NAME');
        $apiKey = env('CLOUDINARY_API_KEY');
        
        $this->info("Cloud Name detected: " . ($cloudName ?? 'NOT SET (relying on URL)'));
        $this->info("API Key detected: " . ($apiKey ? substr($apiKey, 0, 4) . '****' : 'NOT SET'));

        try {
            $this->info('Attempting to upload a sample image (https://via.placeholder.com/150)...');
            
            // Upload a remote file to test credentials and default folder
            $result = Cloudinary::upload('https://via.placeholder.com/150');
            
            $uploadedUrl = $result->getSecurePath();
            $publicId = $result->getPublicId();

            $this->info('--------------------------------------------------');
            $this->info('✅ Upload Successful!');
            $this->info("Public ID: $publicId");
            $this->info("URL: $uploadedUrl");
            $this->info('--------------------------------------------------');

            // Verify if it landed in the correct folder
            if (str_contains($publicId, 'francs/')) {
                 $this->info('✅ Folder verification passed: File is in "francs" folder.');
            } else {
                 $this->warn('⚠️ Folder verification failed: File does NOT appear to be in "francs" folder. Check default folder config.');
            }

        } catch (\Exception $e) {
            $this->error('❌ Upload Failed!');
            $this->error('Error Message: ' . $e->getMessage());
            $this->error('Trace: ' . $e->getTraceAsString());
        }
    }
}
