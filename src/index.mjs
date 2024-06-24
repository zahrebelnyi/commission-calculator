import fs from 'fs';
import path from 'path';
import { CommissionCalculator } from './services/CommissionCalculator.mjs';
import { CashOutOperationStore } from './services/CashOutOperationStore.mjs';

const filePath = process.argv[2];
const fullPath = path.resolve(filePath);
fs.readFile(fullPath, 'utf8', (err, data) => {
  const operations = JSON.parse(data);
  const cashOutOperationStore = new CashOutOperationStore();
  const commissionCalculator = new CommissionCalculator(cashOutOperationStore);
  operations.forEach((operation) => {
    console.log(commissionCalculator.calculate(operation).toFixed(2));
  });
});
