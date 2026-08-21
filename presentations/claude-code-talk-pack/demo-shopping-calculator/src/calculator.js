export function calculateBill({
  price,
  quantity,
  discountType,
  discountValue,
  taxRate
}) {
  validateInputs({ price, quantity, discountValue, taxRate });

  const subtotal = price * quantity;

  let discount = 0;
  let tax = 0;
  let total = subtotal;

  if (discountType === "percent") {
    discount = subtotal * (discountValue / 100);
    const discountedSubtotal = subtotal - discount;
    tax = discountedSubtotal * (taxRate / 100);
    total = discountedSubtotal + tax;
  } else if (discountType === "fixed") {
    tax = subtotal * (taxRate / 100);
    discount = Math.min(discountValue, subtotal);
    total = subtotal + tax - discount;
  } else {
    throw new Error("Unsupported discount type");
  }

  return {
    subtotal: roundMoney(subtotal),
    discount: roundMoney(discount),
    tax: roundMoney(tax),
    total: roundMoney(total)
  };
}

function validateInputs({ price, quantity, discountValue, taxRate }) {
  if (price < 0) throw new Error("Price cannot be negative");
  if (quantity <= 0) throw new Error("Quantity must be greater than zero");
  if (discountValue < 0) throw new Error("Discount cannot be negative");
  if (taxRate < 0) throw new Error("Tax rate cannot be negative");
}

function roundMoney(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}
