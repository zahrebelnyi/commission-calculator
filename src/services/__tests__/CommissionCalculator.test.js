import { CommissionCalculator } from '../CommissionCalculator.mjs';
import { CashOutOperationStore } from '../CashOutOperationStore.mjs';

describe('CommissionCalculator', () => {
  let commissionCalculator;

  beforeEach(() => {
    const cashOutOperationStore = new CashOutOperationStore();
    commissionCalculator = new CommissionCalculator(cashOutOperationStore);
  });

  it('should calculate commission for cash in operation', () => {
    const operation = { type: 'cash_in', operation: { amount: 200, currency: 'EUR' } };
    expect(commissionCalculator.calculate(operation)).toBe(0.06);
  });

  it('should calculate commission for natural person cash out operation', () => {
    const operation = {
      type: 'cash_out',
      user_type: 'natural',
      user_id: 1,
      date: '2024-06-24',
      operation: { amount: 500, currency: 'EUR' },
    };
    expect(commissionCalculator.calculate(operation)).toBe(0);
  });

  it('should calculate commission for juridical person cash out operation', () => {
    const operation = {
      type: 'cash_out',
      user_type: 'juridical',
      user_id: 2,
      date: '2024-06-24',
      operation: { amount: 1000, currency: 'EUR' },
    };
    expect(commissionCalculator.calculate(operation)).toBe(3.00);
  });
});
