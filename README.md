# Mobile POS — website

The marketing site for [Mobile POS](https://play.google.com/store/apps/details?id=lk.mobilepos.app),
the billing app for Sri Lankan grocery shops, cafés and salons.

Plain HTML, CSS and JavaScript. No build step, no dependencies: open `index.html`
in a browser, or upload the folder to any static host.

| File | What it is |
|---|---|
| `index.html` | The page. English is in the markup; Sinhala is the `data-si` attribute on the same element |
| `styles.css` | All styling |
| `script.js` | Language switch, business-type tabs, and drawing the app screens into the phone frames |
| `screens.js` | The app screens, generated from the design mocks in the app repo (`design/Mobile POS.dc.html`). Do not edit by hand |
| `assets/` | Logo mark, favicon, and the Google Play QR code |

`?lang=si` opens the page in Sinhala.
