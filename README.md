Got it — thanks for being patient 🙏
You don’t want me to **summarize** or **split sections** across messages.
You want me to give you **one complete README.md file, fully written, with everything included in sequence** — so you can copy-paste it straight into your repo, no missing SQL, no missing setup, no “continued below”.

Here it is, fully bundled:

```markdown
# Website Template (Next.js + Supabase)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).  

It has been extended into a **portfolio/personal site template** with [Supabase](https://supabase.com), [Tailwind CSS](https://tailwindcss.com), and [Framer Motion](https://www.framer.com/motion/).  

It’s based on my own portfolio — with all private information removed — so you can safely clone it, add your own content, and deploy.

---

## 🚀 Features
- Next.js 15 with App Router + TypeScript
- Supabase integration for dynamic content
- Tailwind CSS 4 styling
- Framer Motion animations
- Prebuilt sections: Hero, About, Skills, Projects, Blog, Past Projects, Project Details, Contact
- Mobile responsive

---

## 📂 Project Structure
```

src/
├── app/
│   ├── page.tsx             # Homepage (Hero, About, Skills, Projects, Blog, Contact)
│   ├── past-projects/       # Past projects list + detail view
│   └── projects/\[id]/       # Dynamic project details
│
├── components/              # UI components
│   ├── NavBar.tsx
│   ├── ProjectCard.tsx
│   └── Pastprojectsnavbar.tsx
│
└── lib/
└── supabase/client.ts   # Supabase client

````

---

## Getting Started

Clone the repository:

```bash
git clone https://github.com/your-username/website-template.git
cd website-template
````

Install dependencies:

```bash
npm install
# or
yarn install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
You can start editing by modifying `app/page.tsx`. The page auto-updates as you edit.

---

## ⚙️ Environment Variables

This template uses Supabase for data. Copy `.env.example` into `.env.local`:

```bash
cp .env.example .env.local
```

Fill in with your own Supabase project values (found in **Project Settings → API**):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

⚠️ `.env.local` is gitignored. Never commit your real keys.

---

## 🗄️ Database Setup (Supabase)

This project expects the following tables.
Go to **Supabase Dashboard → SQL Editor**, paste these blocks, and run them.

### Hero

```sql
create table hero (
  id uuid primary key default gen_random_uuid(),
  title text,
  subtitle text,
  background_url text,
  background_color text,
  created_at timestamp default now()
);
```

### About

```sql
create table about (
  id uuid primary key default gen_random_uuid(),
  heading text,
  content text,
  avatar_url text,
  created_at timestamp default now()
);
```

### Skills

```sql
create table skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  level text,
  category text,
  created_at timestamp default now()
);
```

### Projects

```sql
create table projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text,
  cover_url text,
  is_archived boolean default false,
  is_featured boolean default false,
  created_at timestamp default now()
);
```

### Project Details

```sql
create table project_details (
  project_id uuid references projects(id) on delete cascade,
  description text,
  tech_stack text[],
  repo_url text,
  demo_url text,
  screenshots text[]
);
```

### Blog Posts

```sql
create table posts (
  id uuid primary key default gen_random_uuid(),
  title text,
  content text not null,
  tagline text,
  created_at timestamp default now()
);
```

### Past Projects

```sql
create table past_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  tech_stack text[],
  repo_url text,
  demo_url text,
  screenshots text[],
  created_at timestamp default now()
);
```

---

## 🛠 Customization

After setting up your database, update content directly in Supabase:

* **Hero** → Title, subtitle, background image
* **About** → Heading, content, avatar
* **Skills** → Add your skills, categories, levels
* **Projects** → Featured and past projects
* **Posts** → Short blog posts or notes
* **Past Projects** → Archive older projects

All images use Supabase storage or external URLs (placeholders are included).

---

## 🚀 Deployment

The easiest way to deploy is with [Vercel](https://vercel.com):

1. Push your repo to GitHub
2. Import into Vercel
3. Add your environment variables (`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
4. Deploy 🎉

---

## 🔒 Security Notes

* Use the **anon key** client-side (already configured).
* Keep your **service role key** private (server only, never in this template).
* You can add **RLS (Row-Level Security)** in Supabase for more control. Example for `projects` table:

```sql
alter table projects enable row level security;

create policy "Public read access"
on projects for select
using (true);
```

---

## 📚 Learn More

To learn more about Next.js, take a look at the following resources:

* [Next.js Documentation](https://nextjs.org/docs) - learn about features and API.
* [Learn Next.js](https://nextjs.org/learn) - interactive tutorial.
* [Supabase Docs](https://supabase.com/docs) - setup and database.
* [Tailwind CSS Docs](https://tailwindcss.com/docs) - styling.
* [Framer Motion Docs](https://www.framer.com/motion/) - animations.

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

```


