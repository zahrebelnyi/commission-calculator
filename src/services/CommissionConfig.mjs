import { CURRENCY } from '../constants/index.js';

const CASH_IN_CONFIG = {
  percents: 0.03,
  max: {
    amount: 5,
    currency: CURRENCY.EUR,
  },
};

const CASH_OUT_CONFIG = {
  natural: {
    percents: 0.3,
    week_limit: {
      amount: 1000,
      currency: CURRENCY.EUR,
    },
  },
  juridical: {
    percents: 0.3,
    min: {
      amount: 0.5,
      currency: CURRENCY.EUR,
    },
  },
};

export { CASH_IN_CONFIG, CASH_OUT_CONFIG };
