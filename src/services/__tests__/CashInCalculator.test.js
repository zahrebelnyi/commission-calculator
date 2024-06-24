import { CashInCalculator } from '../CashInCalculator.mjs';

describe('CashInCalculator', () => {
  let cashInCalculator;

  beforeAll(() => {
    cashInCalculator = new CashInCalculator();
  });

  it('calculates commission for cash in within limit', () => {
    const operation = { operation: { amount: 200, currency: 'EUR' } };
    expect(cashInCalculator.calculate(operation)).toBe(0.06);
  });

  it('calculates commission for cash in exceeding limit', () => {
    const operation = { operation: { amount: 1000000, currency: 'EUR' } };
    expect(cashInCalculator.calculate(operation)).toBe(5.00);
  });
});
