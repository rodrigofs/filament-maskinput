import VMasker from '../vendor/vanilla-masker/index.js'

describe("VanillaMasker.maskMoney", function() {

  it('throws error: "VanillaMasker: There is no element to bind." when element is undefined', function() {
    expect(function() {
      VMasker(undefined).maskMoney();
    }).toThrow(new Error('VanillaMasker: There is no element to bind.'));
  });

  it('throws error: "VanillaMasker: There is no element to bind." when element is null', function() {
    expect(function() {
      VMasker(null).maskMoney();
    }).toThrow(new Error('VanillaMasker: There is no element to bind.'));
  });

  it('throws error: "VanillaMasker: There is no element to bind." when element is blank', function() {
    expect(function() {
      VMasker("").maskMoney();
    }).toThrow(new Error('VanillaMasker: There is no element to bind.'));
  });

  it('does not throw error when element is empty array', function() {
    expect(function() {
      VMasker([]).maskMoney();
    }).not.toThrow();
  });

});

describe("VanillaMasker.toMoney", function() {

  it('returns the default money', function() {
    expect(VMasker.toMoney('100000000,00')).toEqual('100000000,00');
  });

  it('returns 0,00 money when number is 0', function() {
    expect(VMasker.toMoney('0')).toEqual('0');
  });

  it('returns 0,01 money when number is 1', function() {
    expect(VMasker.toMoney('0,01')).toEqual('0,01');
  });

  it('returns 0,10 default money number is 10', function() {
    expect(VMasker.toMoney('0,10')).toEqual('0,10');
  });

  it('returns 1.000 money when precision is 0', function() {
    expect(VMasker.toMoney(1000, {decimalPrecision: 0})).toEqual('1.000');
  });

  it('returns 100,000,000,00 when delimiter is ","', function() {
    expect(VMasker.toMoney('100000000,00', {decimalSeparator: ',', thousandsSeparator: '.'})).toEqual('100000000,00');
  });

  it('returns 100.000.000.00 when separator is "."', function() {
    expect(VMasker.toMoney( '100000000.00', {decimalSeparator: '.', thousandsSeparator:','})).toEqual('100000000.00');
  });

  it('returns 100.000.000 is true', function() {
    expect(VMasker.toMoney(100000000)).toEqual('100.000.000');
  });

  it('returns -3,75 when showSignal is true and given a float value', function() {
    expect(VMasker.toMoney(-375, {allowNegative: true})).toEqual('-375');
  });

  it('returns 3,75 when showSignal is false and given a float value', function() {
    expect(VMasker.toMoney(-375, {allowNegative: false})).toEqual('375');
  });

  it('returns -3,75 when allowNegative is true and given a string value', function() {
    expect(VMasker.toMoney('-3,75', {allowNegative: true})).toEqual('-3,75');
  });

  it('returns 12,000 when value is 12,000 and precision is 3', function() {
    expect(VMasker.toMoney('12,000', {decimalPrecision: 3})).toEqual('12,000');
  });

  it('returns 123,0000 when value is 123,0000 and precision is 4', function() {
    expect(VMasker.toMoney('123,0000', {decimalPrecision: 4})).toEqual('123,0000');
  });

  it('returns 123,00000 when value is 123,00000 and precision is 5', function() {
    expect(VMasker.toMoney('123,00000', {decimalPrecision: 5})).toEqual('123,00000');
  });

  it('parses proper precision location from strings', function() {
    expect(VMasker.toMoney('1,20', {decimalPrecision: 2})).toEqual('1,20');
  });

});
