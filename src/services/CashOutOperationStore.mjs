import { ZERO } from '../constants/index.js';

class CashOutOperationStore {
  constructor() {
    this.weeklyCashOut = {};
  }

  /**
   * - Total of cash-out by user weekly.
   * - Checks if there is an existing record for the user for the specified week in this.weeklyCashOut.
   * - If no record exists, it initializes the weekly cash-out amount to 0 for the given userKey.
   * - Adds the amount to the existing weekly cash-out total for the user.
   * - This updates the stored amount to reflect the new cash-out transaction.
   * - Checks if a limit is provided and if the updated total exceeds this limit.
   * - This ensures that if a limit is set, any cash-out amount exceeding the limit is handled appropriately.
   * - Calculates the amount by which the total cash-out exceeds the specified limit.
   * - This determines how much the cash-out has gone over the allowed limit.
   * - Sets the user's weekly cash-out total to the limit.
   * - This caps the total at the specified limit to ensure no further cash-out is considered within the limit.
   * - Returns the limit plus any amount that exceeded the limit.
   * - This provides the caller with the total cash-out amount, including any excess beyond the limit.
   * - Returns the updated weekly cash-out total for the user if no limit is provided or the total does not exceed the limit.
   * - This returns the total cash-out amount for the current week after the latest transaction has been added.
   * */
  update(userKey, amount, limit) {
    if (!this.weeklyCashOut[userKey]) {
      this.weeklyCashOut[userKey] = ZERO;
    }

    this.weeklyCashOut[userKey] += amount;

    if (limit && this.weeklyCashOut[userKey] > limit) {
      const excessAmount = this.weeklyCashOut[userKey] - limit;
      this.weeklyCashOut[userKey] = limit;

      return limit + excessAmount;
    }

    return this.weeklyCashOut[userKey];
  }
}

export { CashOutOperationStore };
