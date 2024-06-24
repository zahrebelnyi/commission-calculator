import { NaturalCashOutCalculator } from './NaturalCashOutCalculator.mjs';
import { JuridicalCashOutCalculator } from './JuridicalCashOutCalculator.mjs';

class CashOutCalculator {
  constructor(cashOutRepository) {
    this.naturalCashOutCalculator = new NaturalCashOutCalculator(cashOutRepository);
    this.juridicalCashOutCalculator = new JuridicalCashOutCalculator();
  }

  calculate(operation) {
    const { user_type } = operation;
    const calculateByUserType = {
      natural: () => this.naturalCashOutCalculator.calculate(operation),
      juridical: () => this.juridicalCashOutCalculator.calculate(operation),
    };
    if (!calculateByUserType[user_type]) {
      throw new Error(`Unsupported user type: ${user_type}`);
    }
    return calculateByUserType[user_type]();
  }
}

export { CashOutCalculator };
