import { CashOutCalculator } from '../CashOutCalculator.mjs';
import { CashOutOperationStore } from '../CashOutOperationStore.mjs';
import { NaturalCashOutCalculator } from '../NaturalCashOutCalculator.mjs';
import { JuridicalCashOutCalculator } from '../JuridicalCashOutCalculator.mjs';

describe('CashOutCalculator', () => {
  let cashOutOperationStore;
  let naturalCashOutCalculator;
  let juridicalCashOutCalculator;
  let cashOutCalculator;

  beforeEach(() => {
    cashOutOperationStore = new CashOutOperationStore();
    naturalCashOutCalculator = new NaturalCashOutCalculator(cashOutOperationStore);
    juridicalCashOutCalculator = new JuridicalCashOutCalculator();
    cashOutCalculator = new CashOutCalculator(cashOutOperationStore);
  });

  it('should calculate commission for natural person cash out', () => {
    const operation = {
      type: 'cash_out',
      user_type: 'natural',
      user_id: 1,
      date: new Date('2024-06-24'),
      operation: {
        amount: 200,
        currency: 'EUR',
      },
    };

    jest.spyOn(naturalCashOutCalculator, 'calculate').mockReturnValue(0.6);

    const result = naturalCashOutCalculator.calculate(operation);

    expect(result).toBe(0.6);
    expect(naturalCashOutCalculator.calculate).toHaveBeenCalledWith(operation);
  });

  it('should calculate commission for juridical person cash out', () => {
    const operation = {
      type: 'cash_out',
      user_type: 'juridical',
      user_id: 2,
      date: new Date('2024-06-24'),
      operation: {
        amount: 300,
        currency: 'EUR',
      },
    };

    jest.spyOn(juridicalCashOutCalculator, 'calculate').mockReturnValue(0.9);

    const result = juridicalCashOutCalculator.calculate(operation);

    expect(result).toBe(0.9);
    expect(juridicalCashOutCalculator.calculate).toHaveBeenCalledWith(operation);
  });

  it('should calculate commission for natural person cash out within limit', () => {
    const operation = {
      user_id: 1,
      user_type: 'natural',
      date: '2024-06-24',
      type: 'cash_out',
      operation: { amount: 500, currency: 'EUR' },
    };
    expect(cashOutCalculator.calculate(operation)).toBe(0);
  });

  it('should calculate commission for natural person cash out exceeding limit', () => {
    const operation1 = {
      user_id: 1,
      user_type: 'natural',
      date: '2024-06-24',
      type: 'cash_out',
      operation: { amount: 1000, currency: 'EUR' },
    };
    const operation2 = {
      user_id: 1,
      user_type: 'natural',
      date: '2024-06-24',
      type: 'cash_out',
      operation: { amount: 600, currency: 'EUR' },
    };
    cashOutCalculator.calculate(operation1);
    expect(cashOutCalculator.calculate(operation2)).toBe(1.80);
  });

  it('should calculate commission for juridical person cash out below minimum', () => {
    const operation = {
      user_id: 2,
      user_type: 'juridical',
      date: '2024-06-24',
      type: 'cash_out',
      operation: { amount: 1, currency: 'EUR' },
    };
    expect(cashOutCalculator.calculate(operation)).toBe(0.50);
  });

  it('should calculate commission for juridical person cash out above minimum', () => {
    const operation = {
      user_id: 2,
      user_type: 'juridical',
      date: '2024-06-24',
      type: 'cash_out',
      operation: { amount: 1000, currency: 'EUR' },
    };
    expect(cashOutCalculator.calculate(operation)).toBe(3.00);
  });
});
