<?php

use Filament\Forms\ComponentContainer;
use Filament\Support\RawJs;
use Illuminate\Support\Str;
use Rodrigofs\FilamentMaskInput\Components\MaskInput;
use Rodrigofs\FilamentMaskInput\Emun\MaskType;
use Rodrigofs\FilamentMaskInput\Tests\Fixtures\Livewire;

it('state can be hydrated from array', function () {

    ComponentContainer::make($livewire = Livewire::make())
        ->statePath('data')
        ->components([
            MaskInput::make('money')
                ->statePath($statePathMoney = 'money'),

            MaskInput::make('dynamic')
                ->statePath($statePathDynamic = 'dynamic'),

            MaskInput::make('pattern')
                ->statePath($statePathPattern = 'pattern'),
        ])

        ->fill([
            $statePathDynamic => $stateDynamic = '111.111.111-11',
            $statePathPattern => $statePattern = '111.111.111-11',
            $statePathMoney => $stateMoney = '12,78',
        ]);

    expect($livewire)
        ->getData()->toBe([
            $statePathDynamic => $stateDynamic,
            $statePathPattern => $statePattern,
            $statePathMoney => $stateMoney,
        ]);
});

it('is mask type PATTERN', function () {
    $field = (new MaskInput($name = Str::random()))
        ->mask('999.999.999-99')
        ->container(ComponentContainer::make(Livewire::make()));

    expect($field)
        ->getStatePath()->toBe($name)
        ->and($field)
        ->getMaskType()->toBe(MaskType::PATTERN)
        ->getMask()->toBe('999.999.999-99');

});

it('is mask type Money', function () {
    $field = (new MaskInput($name = Str::random()))
        ->money()
        ->container(ComponentContainer::make(Livewire::make()));

    expect($field)
        ->getStatePath()->toBe($name)
        ->and($field)
        ->getMaskType()->toBe(MaskType::MONEY);

});

it('is mask type Dynamic', function () {
    $field = (new MaskInput($name = Str::random()))
        ->mask(RawJs::make("['999.999.999-99', '99.999.999/9999-99']"))
        ->maxLength(14)
        ->container(ComponentContainer::make(Livewire::make()));

    expect($field)
        ->getStatePath()->toBe($name)
        ->and($field)
        ->getMaxLength()->toBe(14)
        ->getMaskType()->toBe(MaskType::DYNAMIC);
});
