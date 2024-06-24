import { roundUp } from '../utils/utils.js';
import { CASH_OUT_CONFIG } from './CommissionConfig.mjs';
import { ONE_HUNDRED } from '../constants/index.js';

class JuridicalCashOutCalculator {
  calculate(operation) {
    const { amount } = operation.operation;
    const commission = (amount * CASH_OUT_CONFIG.juridical.percents) / ONE_HUNDRED;
    return roundUp(Math.max(commission, CASH_OUT_CONFIG.juridical.min.amount));
  }
}

export { JuridicalCashOutCalculator };
