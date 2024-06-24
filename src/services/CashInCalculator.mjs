import { roundUp } from '../utils/utils.js';
import { CASH_IN_CONFIG } from './CommissionConfig.mjs';
import { ONE_HUNDRED } from '../constants/index.js';

class CashInCalculator {
  calculate(operation) {
    const { amount } = operation.operation;
    const commission = (amount * CASH_IN_CONFIG.percents) / ONE_HUNDRED;
    return roundUp(Math.min(commission, CASH_IN_CONFIG.max.amount));
  }
}

export { CashInCalculator };
