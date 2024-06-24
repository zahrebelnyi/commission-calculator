import { JuridicalCashOutCalculator } from '../JuridicalCashOutCalculator.mjs';

describe('JuridicalCashOutCalculator', () => {
  let juridicalCashOutCalculator;

  beforeAll(() => {
    juridicalCashOutCalculator = new JuridicalCashOutCalculator();
  });

  it('should calculate commission for juridical person cash out below minimum', () => {
    const operation = { operation: { amount: 1, currency: 'EUR' } };
    expect(juridicalCashOutCalculator.calculate(operation)).toBe(0.50);
  });

  it('should calculate commission for juridical person cash out above minimum', () => {
    const operation = { operation: { amount: 1000, currency: 'EUR' } };
    expect(juridicalCashOutCalculator.calculate(operation)).toBe(3.00);
  });
});
