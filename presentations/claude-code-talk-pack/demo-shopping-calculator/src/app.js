import { calculateBill } from "./calculator.js";

const form = document.querySelector("#calculator-form");
const errorEl = document.querySelector("#error");

const fields = {
  price: document.querySelector("#price"),
  quantity: document.querySelector("#quantity"),
  discountType: document.querySelector("#discount-type"),
  discountValue: document.querySelector("#discount-value"),
  taxRate: document.querySelector("#tax-rate")
};

const output = {
  subtotal: document.querySelector("#subtotal"),
  discount: document.querySelector("#discount"),
  tax: document.querySelector("#tax"),
  total: document.querySelector("#total")
};

function formatMoney(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR"
  }).format(value);
}

function readForm() {
  return {
    price: Number(fields.price.value),
    quantity: Number(fields.quantity.value),
    discountType: fields.discountType.value,
    discountValue: Number(fields.discountValue.value),
    taxRate: Number(fields.taxRate.value)
  };
}

function render(result) {
  output.subtotal.textContent = formatMoney(result.subtotal);
  output.discount.textContent = `−${formatMoney(result.discount)}`;
  output.tax.textContent = `+${formatMoney(result.tax)}`;
  output.total.textContent = formatMoney(result.total);
}

function calculateAndRender() {
  errorEl.hidden = true;

  try {
    render(calculateBill(readForm()));
  } catch (error) {
    errorEl.textContent = error.message;
    errorEl.hidden = false;
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  calculateAndRender();
});

calculateAndRender();
