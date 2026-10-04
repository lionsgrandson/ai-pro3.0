# Website usability, accessibility and SEO review

Reviewed 2026-10-04 after the security cleanup. These are separately committed
site improvements; the production malware recovery remains outstanding.

## Fixes

- The logo linked to the nonexistent `/ai-pro-temp` route. It now links home
  through React Router. Unknown paths show a translated recovery page.
- The favicon/touch icon and manifest referenced absent or incorrectly located
  files. The existing company PNG is now `public/logo.png`; its actual 252×252
  size and AI Pro name are reflected in the manifest.
- English/Hebrew spelling, sentence spacing and grammar corrections retain
  the existing services, manufacturers, technical units and business details.
  Contact status/error messages and service-card links now translate correctly.
- Form labels now have matching input IDs, name/email autocomplete and a named
  form. Success/error messages use live status/alert roles; the sending label
  typo is fixed. EmailJS identifiers, payload and validation flow are preserved.
- Language flags are named native buttons, operable by keyboard. Icon-only
  links have accessible names; decorative icons are hidden from screen readers.
  Document language and direction now update on every page, including Contact.
- Added a skip link, visible keyboard focus and main-content focus after route
  changes. Repaired empty/skipped footer headings and invalid nested paragraphs.
- Service-card text appears on touch/mobile screens and keyboard focus, without
  requiring a first tap to expose an otherwise invisible link. Headings retain
  their size while using a proper hierarchy. Dark overlays improve contrast.
- The navigation now occupies its layout space and collapses before the links
  become crowded. Expanded mobile menus scroll within the viewport. Contact
  and service cards can grow with their content; home widths no longer include
  the scrollbar and overflow horizontally.
- The decorative background video has a translated pause/resume control and
  starts paused for reduced-motion preferences. Decorative line animation ends
  within four seconds; reduced-motion CSS disables nonessential transitions.
- Replaced the inaccessible third-party WhatsApp preview with a local component
  preserving the account, phone, avatar and chat-to-WhatsApp flow. Its opener,
  close and send controls have names, keyboard access and focus handling. Escape
  returns focus to the opener. Message query parameters are encoded, and the
  new tab uses `noopener,noreferrer`. Removed the unused widget dependency.
  No actual message was sent during validation.
- Added relevant default metadata, translated route titles/descriptions,
  canonical URLs, a six-route sitemap and the robots sitemap reference.
  Unknown client routes receive `noindex`. No backend or framework conversion.

## Validation

- Clean `npm ci`, production build and all 21 tests in four suites pass.
  Tests cover all routes in both languages, accessible language/logo navigation,
  unknown paths, contact delivery mocks/retry/duplicate guards, WhatsApp focus
  and URL encoding, and video pause/reduced-motion behavior.
- ESLint across JS/JSX has no errors or warnings. The build tool still prints
  CRA's preexisting undeclared Babel-plugin warning. Dependency audit still
  reports 70 affected entries with zero critical findings; see SECURITY_RECOVERY.md.
- Browser checks cover all six routes in Hebrew and English at viewport widths
  320, 768 and 1280 pixels, including mobile navigation, route focus and form labels.
- axe-core 4.7 checks cover WCAG 2 A/AA, WCAG 2.1 AA and best-practice tags.
  Automated checks reported no violations across those page/viewport samples.
  Image/video backgrounds leave some contrast checks incomplete. Muted video,
  pause controls, dark overlays, keyboard interactions and reduced motion were
  reviewed separately. This is **not a full WCAG conformance certification**;
  specialist screen-reader and broader device testing are still appropriate.
- Main production JavaScript decreased from approximately 380 kB to 152 kB
  gzipped by removing the widget's bundled payload, approximately 60% smaller.
- Public host, developer credit, font CSS, menu SVG and avatar returned HTTP 200.
  LinkedIn rejected HEAD with 405; that does not establish a broken profile, so
  the existing destination was retained. No authenticated hosting access used.

## Needs owner or hosting verification

- Phone/fax currently display `074-70170196`, which appears to have an extra
  digit. The owner was asked to confirm the correct number; it was not guessed.
- Real EmailJS inbox delivery, dashboard protection and production deployment
  routing still need verification. Unit tests mock email and WhatsApp sending.
- Route metadata updates in JavaScript. Bots that do not execute JavaScript
  still see the default HTML shell. The server must return real 404 responses
  for unknown URLs if required; a client recovery page cannot set HTTP status.
- Sitemap/canonical URLs use the existing production domain ai-pro.co.il.
  Language switching retains the same URL; separate language URLs/hreflang or
  prerendering would be a distinct routing/deployment change.
- No hosting files were deleted, production deployment made or malware rescan
  performed. Follow SECURITY_RECOVERY.md before declaring the live site clean.
