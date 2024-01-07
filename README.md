[![Latest Version on Packagist](https://img.shields.io/packagist/v/rodrigofs/filament-maskinput.svg?style=flat-square)](https://packagist.org/packages/rodrigofs/filament-maskinput)
[![GitHub Tests Action Status](https://github.com/rodrigofs/filament-maskinput/actions/workflows/run-tests.yml/badge.svg)](https://github.com/rodrigofs/filament-maskinput/actions/workflows/run-tests.yml)
[![PHPStan](https://github.com/rodrigofs/filament-maskinput/actions/workflows/phpstan.yml/badge.svg)](https://github.com/rodrigofs/filament-maskinput/actions/workflows/phpstan.yml)
[![GitHub Code Style Action Status](https://github.com/rodrigofs/filament-maskinput/actions/workflows/fix-php-code-styling.yml/badge.svg)](https://github.com/rodrigofs/filament-maskinput/actions/workflows/fix-php-code-styling.yml)
[![Total Downloads](https://img.shields.io/packagist/dt/rodrigofs/filament-maskinput.svg?style=flat-square)](https://packagist.org/packages/rodrigofs/filament-maskinput)

This package allows you to use a javascript library for formatting form fields called [vanilla-masker](), despite being old it works very well..

# Motivation for Creating the Filament Mask Input Package

## The Problem:

While working with data input masks in web applications, I encountered a specific challenge related to the Firefox browser. The issue was that the implemented masks did not function as expected in this browser, leading to inconsistencies and problems in the user experience.

Furthermore, when considering the use of Alpine.js's native x-mask as an alternative solution, I encountered another hurdle. There seemed to be an issue in the interaction between Alpine.js and Livewire, particularly in how the state was updated. This behavior resulted in the unexpected removal of input masks, affecting the usability and functionality of the application.

## The Solution:

Faced with these challenges, I decided to create the filament-maskinput package. It is designed to implement input masks efficiently, overcoming the issues found with Firefox and the Alpine.js-Livewire interaction. This package ensures browser compatibility and maintains input masks reliably during Livewire's lifecycle.

# Filament Mask Input Package

## Overview
The `filament-maskinput` package enhances FilamentPHP applications by adding masked input functionalities. It allows for the creation of inputs with various masking patterns, including monetary, dynamic, and fixed patterns.

## Installation
Install the package via composer:

```bash
composer require rodrigofs/filament-maskinput
```

## Configuration

You can configure the **filament-maskinput** package through the **config/filament-maskinput.php** file, setting default values for parameters like **precision**, **separator**, **delimiter**, **unit**, and **suffixUnit**.

#### Optionally, you can publish the config using

```bash
php artisan vendor:publish --tag="config"
```

## Usage

### MaskInput Component

**MaskInput** is an extension of **TextInput** in FilamentPHP, designed to create input fields with custom masking patterns.

### Methods

- **money**
    - **Description**: Configures the input field for monetary values.
    - **Parameters**:
        - `$decimalPrecision` (int|null): Decimal precision.
        - `$decimalSeparator` (string|null): Decimal separator.
        - `$thousandsSeparator` (string|null): Thousands delimiter.
        - `$allowNegative` (bool|null): Allow negative.

- **mask**
    - **Description**: Sets the mask pattern for the input.
    - **Parameters**:
        - `$mask` (string | Closure | RawJs | null): The mask pattern or function.

- **maxLength**
    - **Description**: For dynamic masks, `maxLength` acts as a trigger to switch between mask patterns. It's essential when using dynamic masks.
    - **Parameters**:
        - `$length` (int | Closure): Maximum length for the input.

## Examples

#### Money Input
```php
MaskInput::make('money')
->money();

MaskInput::make('money')
->money(decimalPrecision: 3, allowNegative: true);

output: 1.234,56

```

#### Dynamic Input
```php
MaskInput::make('dynamic')
->mask(RawJs::make("['999.999.999-99', '99.999.999/9999-99']"))
->stripCharacters(['.','-', '/'])
->maxLength(14) // Acts as a trigger for mask switching

output: 123.456.789-01 or 12.345.678/9012-34
```

#### Pattern Input
```php
MaskInput::make('pattern')
->mask('99999-999')
->stripCharacters(['-'])

output: 12345-678
```

```php
MaskInput::make('pattern')
->mask('SS.SS.SSSSS.S.S.SSSSSS')
->stripCharacters(['.'])

output: 9B.GR.D08X0.4.G.117974
```

```php
MaskInput::make('pattern')
->mask('AAA-9999')
->stripCharacters(['-'])

output: ABC-1234
```

## Testing

```bash
composer test
```

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Contributing

Please see [CONTRIBUTING](.github/CONTRIBUTING.md) for details.

## Security Vulnerabilities

Please review [our security policy](../../security/policy) on how to report security vulnerabilities.

## Credits

- [Rodrigo Fernandes](https://github.com/rodrigofs)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
