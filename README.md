# BlueCode Technology Solution

A bilingual Next.js site with a MySQL-backed project portfolio, contact form, and administrator dashboard. The portfolio uses Cloudinary for uploaded images. Contact enquiries are saved in MySQL and visible under **Dashboard → Messages**, with optional SMTP notifications.

## Local development

Use Node.js 22.12+ on the Node 22 or 24 release line and a disposable MySQL-compatible database.

```bash
cp .env.example .env
npm ci
npm run prisma:generate
npm run prisma:deploy
npm run dev
```

Set `AUTH_URL` to the URL used to open the app, including the correct scheme and port. Generate a random `AUTH_SECRET` and a unique administrator password of at least 16 characters. Provide `ADMIN_EMAIL` and `DATABASE_URL` in the same environment. An example database URL is `mysql://db_user:URL_ENCODED_PASSWORD@127.0.0.1:3306/bluecode`. Use `/login` for administrator sign-in. Run `npm run typecheck` and `npm run build` before release.

## GojoHost deployment

1. Confirm that the selected plan exposes **Setup Node.js App** in cPanel or has an equivalent managed Node runtime. Use Node.js 22.12+ or Node.js 24, a supported MySQL/MariaDB database, and HTTPS. Confirm outbound SMTP if notifications are required.
2. Place the checkout in the Node application root outside the public web document root. Configure **Production** mode and `server.js` as the application startup file in cPanel. Let Passenger assign or manage the listening endpoint.
3. Set the final HTTPS URL as `AUTH_URL` and provide the environment variables from `.env.example` in cPanel. Use newly issued credentials. If the retired host has a database backup, import it into the new database before migration. Keep a copy of the original backup. The repository contains schema migrations. The old live portfolio, comments, and enquiries require the database backup.
4. In the application's Node environment, run the commands below. On a restored database whose tables match the initial migration but lack Prisma's migration history, verify the schema and baseline the initial migration before using `migrate deploy`. Check the hosting environment's dependency installation policy allows the Prisma engine and includes build-time dependencies.
5. Restart the Node app. On the HTTPS staging URL, verify sign-in, project add/edit/delete, an image upload, a contact form submission, the dashboard inbox and SMTP delivery. After staging succeeds, configure the production URL and DNS while retaining existing mail records, then verify again.

```bash
npm ci --include=dev
npm run prisma:generate
npm run prisma:deploy
npm run build
```

Use the same `AUTH_SECRET` across processes. Leave `TRUSTED_CLIENT_IP_HEADER` blank until the reverse proxy is configured to overwrite a single trusted client-IP header and the origin cannot be accessed directly. The default limiter shares each endpoint's quota across visitors. Use a trusted IP header and proxy throttling before handling public traffic at scale.

If the old `.env` was committed, rotate the old database, SMTP, Cloudinary, session-signing, administrator, and Google service-account credentials where applicable. Removing a file from the new revision leaves it accessible through older Git history.

## Operational notes

- Use Cloudinary project-folder credentials with the minimum necessary permissions. The upload endpoint accepts JPEG, PNG, WebP and AVIF, up to 4 MB, and re-encodes images.
- Contact submissions are stored before sending the best-effort SMTP notification. Review the dashboard inbox if mail is unavailable.
- The blog displays the bilingual summaries in source. Analytics endpoints currently report an unconfigured status. Live GA4 and Search Console require an integration and separately provisioned credentials.
- Back up MySQL and confirm the restore path before promoting a new release. Test load and cache behavior on the actual hosting plan.

## Search and AI discovery

The homepage identifies BlueCode and its public contact information with Organization and WebSite JSON-LD. The services page includes Service JSON-LD and project questions answered in visible English and Amharic copy. Featured case studies live in `lib/featured-work.ts`. Adding a case study there updates the homepage, portfolio and sitemap. Use public project details that the client has approved for publication.

After going live, verify the canonical URLs and crawler rules on the public domain, submit `/sitemap.xml` in Google Search Console, and confirm that the hosting firewall permits public pages to be fetched. `robots.txt` explicitly allows OAI-SearchBot to crawl public pages for ChatGPT search and keeps API paths excluded from crawling.
