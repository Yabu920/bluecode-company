Run these steps locally to apply the schema changes and seed sample blog posts:

1. Install dependencies

```bash
pnpm install
```

2. Generate Prisma client

```bash
pnpm run prisma:generate
```

3. Run migrations (this will modify your local database)

```bash
pnpm run prisma:migrate
```

4. Seed the database

```bash
pnpm run prisma:seed
```

Notes:
- The API endpoint `/api/projects` now returns an object { projects, posts } where `posts` is an array of `BlogPost` records.
- To create/update/delete blog posts via the same endpoint, include `model: 'blog'` in the request body or `?model=blog` for DELETE.
- If you use a production database, back it up before running migrations.
