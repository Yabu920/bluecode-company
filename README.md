# BlueCode-Website

## Database & Prisma

- Set `DATABASE_URL` in your `.env` (Postgres connection string).
- Install dependencies and generate Prisma client:

```bash
pnpm install
npm run prisma:generate
```

- Create and run migrations (dev):

```bash
npm run prisma:migrate
```

If you prefer, run `npx prisma migrate dev --name init` and `npx prisma generate`.

## Uploads

- Uploaded files are saved to `public/uploads` when using a custom server or handled externally. The App Router's route handlers don't directly support multipart parsing reliably; the included `app/api/uploads/route.ts` is a helpful stub and documents options.

## SMTP / Contact

- Configure `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, and `CONTACT_RECEIVER_EMAIL` in `.env` to enable contact emails.
