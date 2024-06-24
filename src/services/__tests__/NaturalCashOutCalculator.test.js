import { NaturalCashOutCalculator } from '../NaturalCashOutCalculator.mjs';
import { CashOutOperationStore } from '../CashOutOperationStore.mjs';

describe('NaturalCashOutCalculator', () => {
  let naturalCashOutCalculator;
  let cashOutOperationStore;

  beforeEach(() => {
    cashOutOperationStore = new CashOutOperationStore();
    naturalCashOutCalculator = new NaturalCashOutCalculator(cashOutOperationStore);
  });

  it('should calculate commission for natural person cash out within limit', () => {
    const operation = { user_id: 1, date: '2024-06-24', operation: { amount: 500, currency: 'EUR' } };
    expect(naturalCashOutCalculator.calculate(operation)).toBe(0);
  });

  it('should calculate commission for natural person cash out exceeding limit', () => {
    const operation1 = { user_id: 1, date: '2024-06-24', operation: { amount: 1000, currency: 'EUR' } };
    naturalCashOutCalculator.calculate(operation1);
    const operation2 = { user_id: 1, date: '2024-06-24', operation: { amount: 600, currency: 'EUR' } };
    expect(naturalCashOutCalculator.calculate(operation2)).toBe(1.80);
  });
});
