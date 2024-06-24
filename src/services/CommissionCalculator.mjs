import { CashInCalculator } from './CashInCalculator.mjs';
import { CashOutCalculator } from './CashOutCalculator.mjs';

class CommissionCalculator {
  constructor(cashOutRepository) {
    this.cashInCalculator = new CashInCalculator();
    this.cashOutCalculator = new CashOutCalculator(cashOutRepository);
  }

  calculate(operation) {
    const { type } = operation;
    const calculateByOperationType = {
      cash_in: () => this.cashInCalculator.calculate(operation),
      cash_out: () => this.cashOutCalculator.calculate(operation),
    };
    if (!calculateByOperationType[type]) {
      throw new Error(`Unsupported operation type: ${type}`);
    }
    return calculateByOperationType[type]();
  }
}

export { CommissionCalculator };
