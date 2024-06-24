import { CashOutOperationStore } from '../CashOutOperationStore.mjs';

describe('CashOutOperationStore', () => {
  let cashOutOperationStore;

  beforeEach(() => {
    cashOutOperationStore = new CashOutOperationStore();
  });

  it('should initialize with an empty state', () => {
    expect(cashOutOperationStore.update('user-1-1', 0, 1000)).toBe(0);
  });

  it('should update the cash out amount correctly', () => {
    cashOutOperationStore.update('user-1-1', 200, 1000);
    const total = cashOutOperationStore.update('user-1-1', 300, 1000);
    expect(total).toBe(500);
  });

  it('should handle multiple users and weeks correctly', () => {
    cashOutOperationStore.update('user-1-1', 200, 1000);
    cashOutOperationStore.update('user-1-2', 300, 1000);
    cashOutOperationStore.update('user-2-1', 400, 1000);
    expect(cashOutOperationStore.update('user-1-1', 100, 1000)).toBe(300);
    expect(cashOutOperationStore.update('user-1-2', 200, 1000)).toBe(500);
    expect(cashOutOperationStore.update('user-2-1', 300, 1000)).toBe(700);
  });

  it('should update and retrieve weekly cash out for a user', () => {
    const userKey = '1-25';
    const limit = 1000;
    expect(cashOutOperationStore.update(userKey, 500, limit)).toBe(500);
    expect(cashOutOperationStore.update(userKey, 600, limit)).toBe(1100);
  });
});
