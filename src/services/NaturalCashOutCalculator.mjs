import { roundUp, getWeekNumber } from '../utils/utils.js';
import { CASH_OUT_CONFIG } from './CommissionConfig.mjs';
import { ONE_HUNDRED } from '../constants/index.js';

class NaturalCashOutCalculator {
  constructor(cashOutRepository) {
    this.cashOutOperationStore = cashOutRepository;
  }

  calculate(operation) {
    const { user_id, date, operation: { amount } } = operation;
    const weekNumber = getWeekNumber(new Date(date));
    const userKey = `${user_id}-${weekNumber}`;

    const totalCashOutOfCurrentWeek = this.cashOutOperationStore.update(
      userKey,
      amount,
      CASH_OUT_CONFIG.natural.week_limit.amount,
    );
    const excessAmount = Math.max(
      0,
      totalCashOutOfCurrentWeek - CASH_OUT_CONFIG.natural.week_limit.amount,
    );

    const commission = (excessAmount * CASH_OUT_CONFIG.natural.percents) / ONE_HUNDRED;
    return roundUp(commission);
  }
}

export { NaturalCashOutCalculator };
