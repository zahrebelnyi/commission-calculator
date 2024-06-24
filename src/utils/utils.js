// eslint-disable-next-line import/no-extraneous-dependencies
import { getISOWeek } from 'date-fns';

export const roundUp = (number) => Math.ceil(number * 100) / 100;

export const getWeekNumber = (date) => getISOWeek(date);
