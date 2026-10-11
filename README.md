# Sunrise Automation

![Playwright Tests](https://github.com/tusharlakhanpal285/sunrise-automation/actions/workflows/playwright.yml/badge.svg)

End-to-end test suite for [sunrisestationery.in](https://sunrisestationery.in), a live e-commerce platform, built with Playwright (JavaScript).

## What is covered

- Homepage loads with correct title and primary call-to-action
- Cart drawer opens and closes
- "New Arrivals" section lists products with prices

Tests run on desktop Chrome and a mobile Chrome viewport, and execute automatically on every push via GitHub Actions.

## Run locally

```bash
npm install
npx playwright install
npx playwright test
npx playwright show-report
```

To run against another environment (for example staging):

```bash
BASE_URL=http://localhost:3000 npx playwright test
```

## Notes

Tests are read-only against the live site: no orders, no payments.
