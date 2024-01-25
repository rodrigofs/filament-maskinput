<?php

namespace Rodrigofs\FilamentMaskInput\Components;

use Closure;
use Filament\Forms\Components\TextInput;
use Filament\Support\RawJs;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Str;
use Rodrigofs\FilamentMaskInput\Emun\MaskType;
use Rodrigofs\FilamentMaskInput\Exception\FilamentMaskInputException;

class MaskInput extends TextInput
{
    protected string $view = 'filament-maskinput::components.index';

    protected MaskType $maskType = MaskType::PATTERN;

    protected ?RawJs $money = null;

    /**
     * @param  int|null  $decimalPrecision  Precision decimal
     * @param  string|null  $decimalSeparator  Decimal separator
     * @param  string|null  $thousandsSeparator  Thousands separator
     * @param  bool | null  $allowNegative  Allow negative numbers
     * @return $this
     */
    public function money(?int $decimalPrecision = null, ?string $decimalSeparator = null, ?string $thousandsSeparator = null, ?bool $allowNegative = false): static
    {
        $decimalPrecision = $decimalPrecision ?? config('filament-maskinput.decimalPrecision');
        $thousandsSeparator = $thousandsSeparator ?? config('filament-maskinput.thousandsSeparator');
        $decimalSeparator = $decimalSeparator ?? config('filament-maskinput.decimalSeparator');
        $allowNegative = $allowNegative ?? config('filament-maskinput.allowNegative');

        $json = Str::of('{')
            ->append("decimalPrecision: {$decimalPrecision},")
            ->append("thousandsSeparator: '{$thousandsSeparator}',")
            ->append("decimalSeparator: '{$decimalSeparator}',")
            ->append("allowNegative: '{$allowNegative}'")
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

    /**
     * @throws FilamentMaskInputException
     */
    public function render(): View
    {
        if (! filled($this->money) && ! filled($this->mask)) {
            throw new FilamentMaskInputException('[MaskInput::class] method mask or money should be called.');
        }

        return parent::render();
    }
}
