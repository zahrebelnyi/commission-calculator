import { roundUp, getWeekNumber } from '../../utils/utils.js';

describe('Utils', () => {
  it('should rounds up numbers correctly', () => {
    expect(roundUp(0.023)).toBe(0.03);
  });

  it('should calculate week number as 26 correctly for 2024-06-24', () => {
    const date = new Date('2024-06-24');
    expect(getWeekNumber(date)).toBe(26);
  });

  it('should calculate week number as 2 for 2016-01-11', () => {
    const date = new Date('2016-01-11');
    expect(getWeekNumber(date)).toBe(2);
  });
});
