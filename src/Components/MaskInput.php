<?php

namespace Rodrigofs\FilamentMaskInput\Components;

use Closure;
use Filament\Forms\Components\TextInput;
use Filament\Support\RawJs;
use Illuminate\Support\Str;
use Illuminate\Support\Stringable;
use Rodrigofs\FilamentMaskInput\Emun\MaskType;

class MaskInput extends TextInput
{
    protected string $view = 'filament-maskinput::components.index';

    protected MaskType $maskType = MaskType::PATTERN;

    protected ?RawJs $money = null;

    /**
     * @param  int|null  $precision Decimal precision
     * @param  string|null  $separator Decimal separator
     * @param  string|null  $delimiter Number delimiter
     * @param  string|null  $unit Money unit -> 'R$ 12.345.678,90'
     * @param  string|null  $suffixUnit Money unit -> '12.345.678,90 R$'
     * @param  bool  $zeroCents Force type only number instead decimal, masking decimals with ",00" Zero cents -> 'R$ 1.234.567.890,00'
     * @return $this
     */
    public function money(?int $precision = null, ?string $separator = null, ?string $delimiter = null, ?string $unit = null, ?string $suffixUnit = null, ?bool $zeroCents = null): static
    {

        $suffixUnit = $suffixUnit ?? config('filament-maskinput.suffixUnit');
        $zeroCents = $zeroCents ?? config('filament-maskinput.zeroCents');
        $precision = $precision ?? config('filament-maskinput.precision');
        $separator = $separator ?? config('filament-maskinput.separator');
        $delimiter = $delimiter ?? config('filament-maskinput.delimiter');
        $unit = $unit ?? config('filament-maskinput.unit');

        $json = Str::of('{')
            ->when($suffixUnit, fn (Stringable $string): Stringable => $string->append("suffixUnit: '{$suffixUnit}',"))
            ->when($zeroCents, fn (Stringable $string): Stringable => $string->append('zeroCents: true,'))
            ->append("precision: {$precision},")
            ->append("separator: '{$separator}',")
            ->append("delimiter: '{$delimiter}',")
            ->append("unit: '{$unit}'")
            ->finish('}');

        $this->maskType = MaskType::MONEY;

        $this->money = RawJs::make($json);

        return $this;
    }

    public function mask(string | \Closure | RawJs | null $mask = null): static
    {
        $this->maskType = MaskType::DYNAMIC;

        if (gettype($mask) === 'string') {
            $length = strlen($mask);
            $this->extraInputAttributes(['maxlength' => $length]);
            $this->maskType = MaskType::PATTERN;
        }

        parent::mask($mask);

        return $this;
    }

    public function maxLength(int | Closure $length): static
    {
        $this->maxLength = $length;

        return $this;
    }

    public function getInjectJS(): RawJs
    {
        if ($this->maskType === MaskType::MONEY) {
            return RawJs::make("FilamentMaskInput('{$this->getId()}').maskMoney({$this->getMoney()});");
        }

        if ($this->maskType === MaskType::DYNAMIC) {
            return RawJs::make("FilamentMaskInput('{$this->getId()}').dynamicMask({$this->getMask()}, {$this->getMaxLength()});");
        }

        return RawJs::make("FilamentMaskInput('{$this->getId()}').maskPattern('{$this->getMask()}');");
    }

    public function getMoney(): ?RawJs
    {
        return $this->evaluate($this->money);
    }

    public function getMaskType(): MaskType
    {
        return $this->maskType;
    }
}
