# AI Pro security recovery

## Status and scope

Repository audit date: 2026-10-04. ai-pro.co.il is a static React application
built with Create React App (`react-scripts` 5.0.1). There is no backend,
database, upload handler, or PHP application in this checkout. A clean web root
should contain only the generated React build and explicitly approved static
assets and host configuration. Unexpected PHP files are suspicious unless the
operator can establish a separate, legitimate requirement.

No malware was identified in the Git content inspected. This does **not** prove
production is clean. No authenticated production document-root access or hosting
scanner result was available; no production files were inspected or removed.

Reviewed all tracked source, translations, HTML, CSS, public files, manifests,
package files, scripts, README/TODO, external URLs and Git file inventory.
Inspected all 53 reachable commits for mailer paths and credential/injection
patterns in source/configuration text, and checked tracked media signatures and
embedded executable markup. `calibration-copy.jpeg` is a WebP image with a JPEG
filename, not executable content. No PHP, shell executable, symlink, injected
script/iframe, obfuscated payload, unsafe HTML sink, hidden spam link, or
untrusted-input redirect was found. React escapes rendered text; i18next's
`escapeValue: false` is used with React rendering, not an HTML sink.

These are manual/static checks and npm advisory checks, not proof that every
dependency is benign. Neither gitleaks nor ggshield was installed in this
environment. No secrets were printed. GitGuardian itself was not removed.

## Historical mailer and credentials

The tracked `.cache_ggshield` recorded an SMTP-credentials finding for an old
local `src/send_email.php`. Its match value is a SHA-256-shaped fingerprint,
not plaintext SMTP credentials. The PHP file is absent from the current
repository and all reachable Git history inspected; no SMTP username/password,
server API secret or private key was identified in those source files.
The ignored cache has been removed from Git tracking; existing history retains
its metadata. Do not publish the cache or restore the old mailer.

The historical SMTP finding warrants identifying the mail account formerly
used by that local PHP file and rotating/revoking its SMTP credential if still
valid. The cache does not establish the SMTP provider or prove the credentials
were committed. Do not invent a provider, credential, or rotate EmailJS's public
key merely because it is visible. If compromise is suspected, rotate hosting
control-panel, SFTP, SSH, deployment tokens, SMTP credentials and any other
credentials accessible to the affected account. Invalidate sessions and review
authorized keys and deployment access. Use private channels for secret values.

## Production recovery procedure

1. Confirm the actual document root, account, domain and any unrelated sites
   sharing the hosting account. Back up the current web root **outside every
   public web root**, retaining timestamps, permissions and a file/hash
   inventory for forensics. Include hidden files and host configuration.
   Verify that the backup can be read before removal.
2. Obtain the hosting scanner's exact paths, signatures and timestamps. Review
   those files without executing them. Check scheduled jobs, injected
   `.htaccess` rules, redirects, account-level configuration and sibling sites.
3. In a trusted environment, compare live relative paths and hashes against a
   fresh build from the reviewed cleanup commit. Account separately for approved
   host-managed files (for example ACME challenges and reviewed routing rules).
   Look for PHP/PHTML/PHAR files, unknown scripts, hidden files and replaced
   HTML/JS. Do not infer safety from a familiar filename.
4. Only after a verified backup exists, remove the existing deployed site files
   in the confirmed document root, using the hosting file manager or an
   operator-reviewed process. Preserve/reapply only reviewed necessary server
   configuration and approved host-managed files. Do not delete a parent
   directory or a shared site. No blind production deletion script is provided.
5. From the reviewed repository revision, run:

   ```sh
   npm ci
   npm run build
   ```

6. Deploy **only the contents of `build/`** to that document root. Never upload
   the repository, `.git`, caches, `.env`, `node_modules`, or forensic backups.
   Keep the SPA fallback for `/`, `/calibration`, `/engineering`, `/repair`,
   `/validation`, and `/contact`; missing static assets should return 404.
7. Do not restore obsolete PHP files such as `send_email.php`. Do not restore
   suspicious scripts or blindly copy the old `.htaccess` back.
8. Rotate hosting, SFTP, SSH, SMTP, deployment and other exposed credentials if
   compromise is suspected, as described above. Remove unauthorized access.
9. Rescan with the hosting malware scanner. Retain the report; do not declare
   the infection fixed until the live site is inspected and the rescan is clean.
10. Review HTTP/access/error, login and deployment logs around infected-file
    modification times. Timestamps can be manipulated; correlate several log
    sources and preserve evidence before log rotation.
11. Ask the host to disable PHP execution for this site's document root. Where
    supported, also deny requests for PHP/PHTML/PHAR files. Confirm that the
    site's dedicated configuration cannot affect another hosted application.

Afterward open each route directly and through navigation, switch Hebrew and
English, inspect desktop/mobile layouts and fonts/images/video/WhatsApp, and
perform one authorized contact delivery test. Clear any CDN/hosting caches
after deploying. Confirm live response headers and request MIME types.

## Deployment behavior

There is no deployment workflow, FTP/SFTP configuration, `.htaccess`, Netlify
configuration or server implementation in this repository. TODO mentions
`.htaccess`, but none is tracked. The `ssr` npm script references a nonexistent
`server/index.js`; it is not used by the production build and does not establish
an actual backend or deployment process. It was left unchanged.

It is therefore unknown whether the actual upload process deletes stale files.
An overwrite-only upload would leave an old PHP or injected file behind across
React deployments; this is a plausible persistence mechanism, not a confirmed
root cause. Ask the operator to verify the upload tool's behavior. Prefer a
reviewed clean-root replacement or a mirror deployment with a dry-run inventory,
explicit destination and reviewed exclusions for approved host-managed files.
Do not add delete/mirror flags to a guessed destination.

## EmailJS and external resources

The public key, service ID and template ID in Contact.jsx are intentional public
client identifiers. The SDK remains bundled locally; the only application API
request is EmailJS's `https://api.emailjs.com` mail endpoint. The form now prevents
concurrent submissions and uses the SDK's one-second client throttle, matching
the service's documented rate. It keeps the same fields, payload, identifiers,
translations and success/error UI. Detailed SDK errors are no longer logged.
Client controls can be bypassed and are not server-side spam protection.

In the EmailJS dashboard, verify the allowed production origins (including the
actual www hostname only if used), quota alerts and fixed recipient/template
settings. Use escaped `{{name}}`, `{{email}}`, `{{subject}}`, `{{message}}`
variables, not triple-brace raw HTML for visitor input. Confirm the recipient
cannot be supplied by visitors. CAPTCHA requires account/template and UI changes
and has not been added speculatively. Dashboard settings were not inspected.
See [SDK options](https://www.emailjs.com/docs/sdk/options/),
[send rate](https://www.emailjs.com/docs/sdk/send/) and
[template escaping](https://www.emailjs.com/docs/user-guide/dynamic-variables-templates/).

Google Fonts CSS/font files, Wikimedia's WhatsApp avatar and SVGRepo's menu
image appear intentional. An exported Pxfuel image URL is unused by current
pages. LinkedIn, developer credit, mailto/tel and WhatsApp destinations are
intentional links. No remote JavaScript tag or analytics injector was found.
All locked package tarball URLs use `https://registry.npmjs.org/`. Installation
hooks remaining after cleanup belong to Font Awesome, core-js/core-js-pure and
optional fsevents; the unused react-snap/Puppeteer browser-download chain was
removed. No unexplained project shell script was found.

## Server headers (recommendations, not active configuration)

The host/server type is unknown. No headers have been claimed active and no
unverified `.htaccess` was placed in the build. Apply the following via the
hosting control panel or the confirmed server configuration:

```text
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
X-Frame-Options: DENY
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: https://upload.wikimedia.org https://www.svgrepo.com https://e0.pxfuel.com; media-src 'self'; connect-src 'self' https://api.emailjs.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'
```

For Apache 2.4 with `mod_headers`, translate these to `Header always set NAME
"VALUE"` in the site's confirmed virtual host or permitted `.htaccess`. For
Nginx use `add_header NAME "VALUE" always;` in the confirmed site server block;
ensure location blocks do not accidentally override inheritance. Apply DENY only
after confirming the site does not need authorized embedding. Deny server-side
script execution before SPA rewrites; a typical Apache 2.4 access-denial rule
to review with the host is:

```apache
<FilesMatch "(?i)\.(php[0-9]*|phtml|phar)(\.|$)">
    Require all denied
</FilesMatch>
```

This access rule supplements disabling PHP handlers; PHP-handler configuration
depends on the host. Do not guess `php_flag` directives on PHP-FPM hosting.

Initially send the CSP as `Content-Security-Policy-Report-Only` on a staging
deployment of the actual production build. Inspect browser violations and
network redirects while testing every route/language/form/media. The policy
allows existing inline styles required by React, Emotion, MUI and MDB, but
does not allow inline scripts or eval. CRA's actual generated scripts must be
checked for inline runtime code; if present, allow its exact hash or configure
an external runtime before enforcement. Development needs additional HMR
WebSocket permissions; this policy targets production only. Do not add wildcard
sources to hide violations. `frame-ancestors` and report-only CSP require HTTP
headers and cannot be made effective through a meta tag.

Only after verifying HTTPS works consistently for the domain, consider:
`Strict-Transport-Security: max-age=31536000`. Do not add `includeSubDomains`
or `preload` without confirming every affected subdomain is HTTPS-ready. HSTS
was not enabled by this repository change.

## Dependency audit and remaining risks

The initial npm audit reported 80 affected package entries: 15 low, 16 moderate,
46 high and 3 critical. The cleanup removes unused react-snap (no import,
postbuild or prerender invocation exists) and its obsolete Puppeteer/minimalcss/
html-minifier chain. Reviewed compatible lockfile updates retain React 18,
React Router 6 and react-scripts 5; no forced major upgrade was applied. A
scoped jsonpath override updates its pinned underscore 1.13.6 to patched
1.13.8, within the same minor line. Critical form-data, shell-quote and
websocket-driver entries were patched. Other fixes include Babel, router,
cross-spawn, lodash, minimatch, js-yaml, webpack, PostCSS and ws advisories.

Remaining audit entries and individual advisory links are recorded below.
Package counts include dependent packages affected through shared vulnerable
tooling; they are not counts of independent remotely exploitable website bugs.
This static site does not deploy Node dependency trees or run webpack's dev
server in production. Keep development servers local and builds in trusted
environments; do not process attacker-supplied assets/configuration with this
toolchain. The app uses fixed local routes in BrowserRouter, with no SSR
hydration or attacker-derived navigation input. Router advisories still remain
in its dependency version; a major upgrade requires a separate scoped task.
Full tooling remediation also needs separately tested modernization, excluded
from this cleanup. Do not use `npm audit fix --force`: npm proposes removing
the usable react-scripts version or changing the router major version.

## Verification

Final `npm ci` and `npm run build` succeeded on Node 22.23.2 / npm 11.12.1.
The build retains existing CSS/autoprefixer and unused-import/accessibility
warnings, plus CRA's existing undeclared Babel plugin warning. ESLint across
all JS/JSX reports zero errors and seven existing warnings.

Both test suites pass: 15 tests cover all six routes in English/Hebrew, contact
success payload/reset, failure/retry and duplicate/incomplete submission guards.
The original unused CRA sample test was replaced with actual route checks.
jsdom's missing IntersectionObserver is stubbed only in test setup.
On this Windows environment Watchman failed to start; tests passed with:

```sh
node node_modules/react-scripts/bin/react-scripts.js test --watchAll=false --runInBand --watchman=false
```

Ran the final production build through a local static preview server and checked
home/contact rendering and both language switches in the browser. Generated
HTML uses an external script, with no inline runtime script. No real email was
sent. Git diff whitespace checks pass, unchanged-version lockfile integrity
values match the original, and the final diff was restricted to security
dependency changes, cache removal, contact safeguards, verification tests and
this recovery document. The ignored cache remains local and GitGuardian is
not uninstalled.
No layout, styling, image, business information, route or translation edits
are part of this cleanup. Tests mock EmailJS delivery; actual inbox delivery
and production server routing/headers require operator verification.

### Final npm audit inventory

Final `npm audit`: **70 affected package entries (3 low, 6 moderate, 61 high, 0 critical)**. The command exits 1 because findings remain. The increased high-severity dependent count reflects the resolved dependency graph/advisory propagation; it does not mean all findings were fixed.

- **@tootallnate/once** (low): [@tootallnate/once vulnerable to Incorrect Control Flow Scoping](https://github.com/advisories/GHSA-vpq2-c234-7xj6).
- **braces** (high): [braces vulnerable to stack-exhaustion denial of service through deeply nested patterns](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm).
- **node-forge** (high): [node-forge RSA PKCS#1 v1.5 signature verification accepts extra nested DigestAlgorithm elements](https://github.com/advisories/GHSA-86w9-cpqp-85rv).
- **nth-check** (high): [Inefficient Regular Expression Complexity in nth-check](https://github.com/advisories/GHSA-rp65-9cf3-cjxr).
- **postcss** (high): [PostCSS line return parsing error](https://github.com/advisories/GHSA-7fh5-64p2-3v2j); [PostCSS has XSS via Unescaped </style> in its CSS Stringify Output](https://github.com/advisories/GHSA-qx2v-qp2m-jg93); [PostCSS: Arbitrary file read and information disclosure via attacker-controlled sourceMappingURL in CSS comments](https://github.com/advisories/GHSA-6g55-p6wh-862q); [PostCSS: incomplete fix of GHSA-6g55-p6wh-862q — attacker-controlled sourceMappingURL reads arbitrary .map files when `from` is unset](https://github.com/advisories/GHSA-fxqj-rqcc-2cmp); [PostCSS: Path Traversal in Previous Source Map Auto-Loading (sourceMappingURL) leads to Arbitrary .map File Disclosure](https://github.com/advisories/GHSA-r28c-9q8g-f849).
- **react-router** (moderate): [React Router: Open redirect via backslash in <Link> and useNavigate (CVE-2025-68470 bypass)](https://github.com/advisories/GHSA-wrjc-x8rr-h8h6); [React Router: Arbitrary Constructor Injection via deserializeErrors() in React Router SSR Hydration](https://github.com/advisories/GHSA-337j-9hxr-rhxg).
- **serialize-javascript** (high): [Serialize JavaScript is Vulnerable to RCE via RegExp.flags and Date.prototype.toISOString()](https://github.com/advisories/GHSA-5c6j-r48x-rmvq); [Serialize JavaScript has CPU Exhaustion Denial of Service via crafted array-like objects](https://github.com/advisories/GHSA-qj8w-gfj5-8c6v).
- **svgo** (high): [SVGO removeScripts plugin leaves some executable scripts intact](https://github.com/advisories/GHSA-2p49-hgcm-8545); [SVGO: removeScripts allows executable links through namespace and control-character bypasses](https://github.com/advisories/GHSA-w27v-7q3p-w38r); [SVGO: removeScripts incompletely sanitizes executable HTML in SVG foreignObject elements](https://github.com/advisories/GHSA-4vpr-x523-8j87).
- **uuid** (moderate): [uuid: Missing buffer bounds check in v3/v5/v6 when buf is provided](https://github.com/advisories/GHSA-w5hq-g745-h8pq).
- **webpack-dev-middleware** (high): [webpack-dev-middleware vulnerable to Path Traversal via non-slash-terminated publicPath](https://github.com/advisories/GHSA-g84c-rxfj-3j2c).
- **webpack-dev-server** (high): [webpack-dev-server users' source code may be stolen when they access a malicious web site with non-Chromium based browser](https://github.com/advisories/GHSA-9jgg-88mc-972h); [webpack-dev-server users' source code may be stolen when they access a malicious web site](https://github.com/advisories/GHSA-4v9v-hfq4-rm2v); [webpack-dev-server vulnerable to cross-origin source code exposure on non-HTTPS origins](https://github.com/advisories/GHSA-79cf-xcqc-c78w); [webpack-dev-server vulnerable to HMR WebSocket interception via permissive user proxies](https://github.com/advisories/GHSA-mx8g-39q3-5c79); [webpack-dev-server vulnerable to cross-site request forgery via internal developer endpoints](https://github.com/advisories/GHSA-f5vj-f2hx-8m93); [webpack-dev-server vulnerable to denial of service via a malformed Host or Origin header](https://github.com/advisories/GHSA-m28w-2pqf-7qgj).

All affected package entries, including transitive propagation: `@jest/console`, `@jest/core`, `@jest/environment`, `@jest/fake-timers`, `@jest/globals`, `@jest/reporters`, `@jest/test-result`, `@jest/test-sequencer`, `@jest/transform`, `@svgr/plugin-svgo`, `@svgr/webpack`, `@tootallnate/once`, `@types/jest`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/experimental-utils`, `@typescript-eslint/parser`, `@typescript-eslint/type-utils`, `@typescript-eslint/typescript-estree`, `@typescript-eslint/utils`, `babel-jest`, `braces`, `chokidar`, `css-minimizer-webpack-plugin`, `css-select`, `eslint-config-react-app`, `eslint-plugin-testing-library`, `eslint-webpack-plugin`, `expect`, `fast-glob`, `fork-ts-checker-webpack-plugin`, `globby`, `http-proxy-agent`, `http-proxy-middleware`, `jest`, `jest-circus`, `jest-cli`, `jest-config`, `jest-environment-jsdom`, `jest-environment-node`, `jest-haste-map`, `jest-jasmine2`, `jest-message-util`, `jest-resolve`, `jest-resolve-dependencies`, `jest-runner`, `jest-runtime`, `jest-snapshot`, `jest-watch-typeahead`, `jest-watcher`, `jsdom`, `micromatch`, `node-forge`, `nth-check`, `postcss`, `react-dev-utils`, `react-router`, `react-router-dom`, `react-scripts`, `resolve-url-loader`, `rollup-plugin-terser`, `selfsigned`, `serialize-javascript`, `sockjs`, `svgo`, `tailwindcss`, `uuid`, `webpack-dev-middleware`, `webpack-dev-server`, `workbox-build`, `workbox-webpack-plugin`.
