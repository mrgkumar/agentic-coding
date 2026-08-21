# Shopping Calculator

A small browser-based shopping calculator written with JavaScript modules.

## What it does

The form accepts:

- item price and quantity,
- a percentage or fixed discount,
- a tax rate.

It displays subtotal, discount, tax and final total.

## Run the app

Because the JavaScript uses ES modules, serve this folder with a local web server.

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Run tests

```bash
npm test
```

No npm install is required.

## Main files

```text
index.html
  ↓
src/app.js
  ↓
src/calculator.js

tests/calculator.test.js
```
