# Cloudways recovery work — 2026-10-04

## Current status

The live application is **not yet confirmed malware-free**. Repository cleanup
and website improvements are committed locally on `security/malware-cleanup`;
they have not been deployed or pushed.

The authenticated Cloudways dashboard identifies application **AIpro**
(5829325), domain `ai-pro.co.il`, on server **CodeCrafter** (1497511).
Its application folder is `uvhfvnwyzz`, webroot `public_html/`, and selected
web stack is **Lightning Stack (Nginx)**. Apache `.htaccess` suggestions in
SECURITY_RECOVERY.md must not be assumed effective on this stack.

## Changes applied in Cloudways

Three application Header Rules were added with Set and Always Apply enabled:

| Header | Value | Purpose |
| --- | --- | --- |
| X-Content-Type-Options | nosniff | Prevent browsers interpreting files as a different content type. |
| Referrer-Policy | strict-origin-when-cross-origin | Avoid sending full page paths to other sites. |
| Permissions-Policy | camera=(), microphone=(), geolocation=() | Disable device features this static website does not use. |

Cloudways confirmed that Web Rules were updated successfully. An independent
HTTPS HEAD request to the public homepage returned HTTP 200 and all three
headers. Before applying nosniff, the existing live JS and CSS returned 200
with application/javascript and text/css respectively.

An on-demand application backup was requested. Cloudways showed backup in
progress, then returned to its normal backup controls. The latest restore
point visibly listed afterward was **2026-10-04 02:52:12 UTC**, older than this
request. Therefore the new backup's completion is **not verified**. The listed
restore point has not been tested by restoring production.

## Findings and limits

- The Incidents screen lists suspicious WAF requests, including webshell,
  WordPress and React/Next.js attack signatures. These are request detections,
  not evidence that this application's files contain those products or malware.
- Malware Protection is disabled. Its advertised price is $4/month per
  application. The owner explicitly requested keeping the paid add-on disabled;
  no subscription was enabled and no automatic cleanup was run.
- The application's Advanced Cron editor was empty. This does not establish
  that server-level scheduled tasks or other persistence mechanisms are absent.
- SSL auto-renewal was already enabled, with certificate expiry displayed as
  2026-11-17. No SSL changes were needed or applied.
- No Header Rules or Rewrite Rules were configured before this work. Only the
  three header rules above were added; routing and web stack were not changed.
- The browser SSH terminal initially presented a certificate warning. The owner
  handled the warning and signed in. The resulting shell was the different
  application account `vkkchjapjd`; read-only access to AIpro's directory was
  denied. No sibling application's files were inspected or changed.
- No live files were quarantined, deleted or replaced. No live malware scan,
  credential rotation, cache purge or clean-build deployment was completed.
- During the login handoff, a credential appeared to be entered in the visible
  username field. The owner was asked to cancel that attempt, use the correct
  username, and rotate the exposed credential themselves. No credential value
  is recorded in this report.

## Next required steps

Use AIpro's existing SSH credentials or the server's Master Credentials to
inspect the correct directory. Obtain the original provider malware report
with detected paths/signatures, verify a readable backup outside public roots,
and compare the live files with the clean build. Quarantine unexplained files
outside webroots before deploying the reviewed build. Inspect application and
server persistence and access logs, and obtain a fresh provider malware scan.
Rotate the former PHP mailer's SMTP password if still valid; do not restore
that obsolete mailer.

The applied headers improve browser protection; they do not remove malware.
See SECURITY_RECOVERY.md for repository security findings and WEBSITE_REVIEW.md
for spelling, accessibility, SEO and mobile fixes and validation.
