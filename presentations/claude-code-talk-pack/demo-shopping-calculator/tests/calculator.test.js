import test from "node:test";
import assert from "node:assert/strict";
import { calculateBill } from "../src/calculator.js";

test("calculates a bill with a percentage discount", () => {
  const result = calculateBill({
    price: 500,
    quantity: 2,
    discountType: "percent",
    discountValue: 10,
    taxRate: 5
  });

  assert.deepEqual(result, {
    subtotal: 1000,
    discount: 100,
    tax: 45,
    total: 945
  });
});

test("rejects a negative item price", () => {
  assert.throws(
    () =>
      calculateBill({
        price: -100,
        quantity: 1,
        discountType: "fixed",
        discountValue: 0,
        taxRate: 18
      }),
    /Price cannot be negative/
  );
});

test("caps a fixed coupon at the subtotal", () => {
  const result = calculateBill({
    price: 100,
    quantity: 1,
    discountType: "fixed",
    discountValue: 500,
    taxRate: 0
  });

  assert.equal(result.total, 0);
});
