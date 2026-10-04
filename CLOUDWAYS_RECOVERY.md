# Cloudways recovery work â€” 2026-10-04

## Status

The reviewed website is now deployed to the live AIpro application. The old
webroot was backed up privately and replaced, rather than overwritten in place.
**A fresh provider malware scan is pending; the server is not yet confirmed
malware-free.**

[Cloudways ticket #984182](https://tickets.cloudways.com/hc/en-us/requests/984182)
requests a scan, detected paths/signatures and application-specific PHP execution
advice. The owner approved the exact message and a follow-up asking Cloudways
to correct HTTPS directory redirects. Both messages were successfully submitted.
The ticket is Open; only an automated acknowledgment has been received.

The reviewed source was pushed to `security/malware-cleanup` for deployment.
Main was not merged or modified. The initial deployed code was from commit `2a93ae5`
(website code commit `4eb54b9`). A subsequent desktop layout build was deployed
on the same date; see the follow-up below.

## Findings

- Application **AIpro** (5829325), domain `ai-pro.co.il`, server **CodeCrafter**
  (1497511), folder `uvhfvnwyzz`, webroot `public_html/`, **Lightning Stack
  (Nginx)**. Apache .htaccess examples in SECURITY_RECOVERY.md do not apply here.
- Initial webroot: **51 files, about 27 MB**, with October 2025 prerendered HTML
  and obsolete bundles alongside February 2026 files. Earlier uploads
  demonstrably left stale files behind.
- No PHP/PHTML/PHAR files, dotfiles or symlinks were found in the initial
  webroot. No matching server-side/persistence files were found in application
  private_html and tmp in a three-level traversal. These checks are not a full
  malware scan.
- Cloudways Advanced Cron and the signed-in master user's crontab were empty.
  Root/system jobs and sibling applications were not fully audited.
- WAF incidents show suspicious requests. Retained access logs also contain
  HTTP 200 responses for WordPress/PHP paths absent from the current webroot.
  Status codes alone cannot establish PHP execution or a successful exploit.
- Imunify360 is installed, but its CLI requires root; non-interactive sudo
  requires credentials. No scan or automatic cleanup was run.
- Paid Malware Protection stays disabled as explicitly requested. No add-on,
  subscription, support upgrade or hosting upgrade was purchased.

## Backups and deployment

Private recovery directory: `/home/master/aipro-recovery-20261004`, verified
mode **700**, outside application webroots.

- `public_html-before.tar.gz`: readable archive of all 51 original files,
  with verified listing. SHA-256:
  `4bda3520bbc986e4af6eeaca9b4ee71eda3d0661935d35aeecd1b8281226e796`.
- `old-live/`: all original live files, moved intact rather than deleted.
- `first-transfer/`: retained transfer/rollback state. Initial rsync could not
  set the provider-owned root's timestamp. Originals were restored, then
  deployment succeeded using --omit-dir-times.
- `reviewed-build.tar.gz` and `reviewed_build/`: clean uploaded build/staging.
  Upload SHA-256 verified on server:
  `6d5aa8cf1b11e6f8cabf08495880efa0004b3bdaa96d6c45e2f33a743ead9bc8`.
- `application-logs-readable.tar.gz`: verified listing of 190 entries.
  Unreadable php-app.slow.log was explicitly excluded; provider access is
  required for it. An earlier partial archive is retained separately.
- `source/`: reviewed branch checkout kept private. Source, Git, dependencies,
  credentials and recovery archives were not deployed publicly.

Production had about 129 MB of available RAM, so the previously tested local
build was uploaded through SFTP instead of compiling on production. Its SSH
host fingerprint was verified against the authenticated browser terminal.
Existing credentials were used without creating a key/account or saving a
password to disk.

The build has 37 files. Five clean route entry files, identical to the reviewed
root index.html, serve direct visits to engineering, validation, calibration,
repair and contact. **Final live inventory: 42 files.** Directory comparison
confirms equality with staged build plus these route entries. Old assets and
prerendered pages are no longer public.

A Cloudways on-demand backup was also requested, but its new restore point was
not verified. The dashboard listed an older 2026-10-04 02:52:12 UTC backup.
The verified private archive above supplies recovery for this deployment.

## Live configuration changes

All Header Rules use Set and Always Apply.

| Header | Value |
| --- | --- |
| X-Content-Type-Options | nosniff |
| Referrer-Policy | strict-origin-when-cross-origin |
| Permissions-Policy | camera=(), microphone=(), geolocation=() |
| Strict-Transport-Security | max-age=31536000 |

HSTS has no includeSubDomains or preload. SSL auto-renewal was already enabled,
with expiry displayed as 2026-11-17; no certificate changes were applied.

Enabled HTTPS Redirection, reset file/folder ownership and permissions to the
existing application owner, and purged site cache. Added a permanent redirect
from `^/ai-pro-temp/?$` to `/`, retaining query strings.

Static route entries replaced a tested internal rewrite that conflicted with
Cloudways' forced HTTPS rule. Requests preserve the intended page. A provider
directory-redirect issue remains: slashless HTTPS page URLs first redirect to
an HTTP trailing-slash URL, which HTTPS Redirection upgrades again. HSTS
protects subsequent browser requests. Final pages work on HTTPS, but Cloudways
has been asked to remove the extra hop and preserve HTTPS in Location headers.

## Validation and remaining work

- The reviewed build previously passed clean installation, production build,
  ESLint and **21 tests**. WEBSITE_REVIEW.md records bilingual/mobile and
  accessibility checks; these are not WCAG certification.
- Public homepage, five pages, JS/CSS, logo, sitemap and robots checked.
  Expected pages/assets return 200 after redirects; unknown paths and obsolete
  main.eba9b18e.js return 404. Correct JS/CSS MIME types verified.
- Browser verification confirms English/Hebrew Contact labels, title and
  language switching. No actual email or WhatsApp message was sent.
- Fresh provider scan, root/server persistence review, PHP handler protection
  and directory redirect correction remain pending. PHP was not disabled
  globally because another application shares the server.
- The earlier login handoff exposed a credential in the visible username field.
  The owner was asked to rotate it themselves. Rotate the obsolete PHP mailer's
  SMTP password too if still valid. No credential values are recorded here.
- Real EmailJS delivery/dashboard restrictions and the suspiciously long
  phone/fax number still need owner verification.

Keep recovery copies until Cloudways provides scan results and any detected
files or persistence are resolved. A clean static deployment and headers do
not prove eradication of the original server infection.

## Desktop layout deployment follow-up — 2026-10-04

Deployed the Contact, Home and shared service-page layout fixes described in
WEBSITE_REVIEW.md. Preserved the preceding clean deployment in
`before-desktop-layout/` and a readable `before-desktop-layout.tar.gz` under the
same private recovery directory. The new staged build is `desktop-build/`;
its uploaded archive is `desktop-build.tar.gz`, SHA-256:
`aebe0d2d724f400498bdf979b509ea1209fe0d36a326dcd070dbbebe4528767d`.

The deployment checks verified the archive hash, 42-file staged inventory,
readable backup and equality between stage and deployed files before completion.
Cloudways permission reset completed, followed by cache purge. Live Contact
serves `main.0fc21f69.js` and `main.97500ebb.css`; both language layouts were
verified in the browser. The original malware scan/PHP/redirect requests remain
pending; no additional support message or paid service was enabled.

## Footer/video deployment follow-up — 2026-10-04

Deployed the requested footer RTL icon fix and removal of the video button.
Previous live files are retained in `before-footer-layout/` and a readable
`before-footer-layout.tar.gz` in the private recovery directory. Staged files:
`footer-build/`; uploaded archive: `footer-build.tar.gz`, SHA-256:
`67fbecb52d59ed397883b8b9b8d431e1a0e0bdf630710fe0a04363f9c70f9db1`.
SSH host identity, upload checksum, readable backup, 42-file inventory and stage
comparison passed. Cloudways ownership reset and site cache purge followed.
Live assets are `main.eb523a54.js` and `main.d352ccf4.css`. No further support
messages, add-ons or credential changes were made.
