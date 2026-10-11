# Sunrise Automation

![Playwright Tests](https://github.com/tusharlakhanpal285/sunrise-automation/actions/workflows/playwright.yml/badge.svg)

Automated tests for [sunrisestationery.in](https://sunrisestationery.in), the online store I built for my family's stationery shop in Amritsar. I wrote these in Playwright (JavaScript) to learn test automation on a real app instead of a practice site.

## What's tested

14 tests, each run on desktop Chrome and a Pixel 7 mobile viewport:

- **Home:** page loads, title is right, cart drawer opens and closes
- **Products:** New Arrivals section shows products with prices
- **Search:** searching a product name narrows the list, a nonsense word shows nothing
- **Cart:** adding a product, the + and - buttons change the subtotal, pressing - at quantity 1 empties the cart, empty cart message
- **Payment options:** with 30% advance, advance + balance equals the total; with full payment, the pay button shows the full total
- **Login page:** form is shown, empty submit is blocked by the email field

## Things I ran into

- **CI failed while local passed.** The payment tests showed a "Store Closed" button on GitHub. The site checks store hours using the browser's time, and GitHub's machines run on UTC, so it was always "before 9 AM" for them. I fixed it by setting the browser timezone to Asia/Kolkata in the config and fixing the clock inside the payment tests, so they pass at any time of day.
- **Mobile login.** On a phone the Login link is inside the hamburger menu, so the same test failed on mobile only. The test now opens the menu first when running on mobile.
- **Bad search word.** My first search test used "pen" and failed, because it also matches "Independence Day" and "Pencil" and the page only shows 12 products at a time. I switched to a specific product name.
- **Cart is not saved on refresh.** The cart only lives in memory, so a refresh empties it. Good for testing on the live site (nothing gets stored), but something I want to improve in the app later.

## Rules I followed

- The tests only read. They never place an order or press a pay button, because the site is live.
- No `waitForTimeout`. I rely on Playwright's auto-waiting and `expect`.

## Run it

```bash
npm install
npx playwright install
npx playwright test
npx playwright show-report
```

To point the tests at another environment:

```bash
BASE_URL=http://localhost:3000 npx playwright test
```

Tests also run on every push through GitHub Actions.

## Next

- Page Object Model for cart and login
- Checkout flow on a staging copy with Razorpay test mode
- API tests for orders and products