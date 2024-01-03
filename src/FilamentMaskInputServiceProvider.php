<?php

namespace Rodrigofs\FilamentMaskInput;

use Filament\Support\Assets\Js;
use Filament\Support\Facades\FilamentAsset;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;

class FilamentMaskInputServiceProvider extends PackageServiceProvider
{
    public function configurePackage(Package $package): void
    {
        $package->name('filament-maskinput')
            ->hasAssets()
            ->hasConfigFile('filament-maskinput')
            ->hasViews();
    }

    public function packageBooted(): void
    {
        FilamentAsset::register([
            Js::make('filament-maskinput', __DIR__ . '/../dist/filament-maskinput.js'),

        ], 'rodrigofs/filament-maskinput');
    }
}
