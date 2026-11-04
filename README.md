# adi.codes

Source for [adi.codes](https://adi.codes), the portfolio and notes of Aditya
Bhaskar Sharma — product engineer, iOS, React Native and full-stack web.

**Open to full-time roles, contracts (short or long term) and freelance
projects.** [Email](mailto:adityabhaskarsharma@gmail.com) ·
[LinkedIn](https://www.linkedin.com/in/-abs-) ·
[Résumé](https://adi.codes/assets/resume/mobile-resume-latest.pdf) ·
client projects go through [LazyCodeLab](https://lazycodelab.com).

## What's in here

- **Next.js 16** (App Router, React 19, Turbopack), **Tailwind CSS 4**,
  Framer Motion, TypeScript.
- A terminal-flavoured, two-panel homepage that tracks the section you're
  reading; on phones it collapses into one column with a bottom nav.
- Projects and a project graveyard driven from `data/projects.ts` and
  `data/graveyard.ts` — honest status, version and dates for each.
- A markdown/MDX blog with drafts, generated social images
  (`/api/og/<slug>`), JSON-LD, sitemap, and a full-content RSS feed at
  `/feed.xml`. Writing and publishing a post is two commands — see
  [`BLOGGING.md`](./BLOGGING.md).
- Light and dark themes from one set of classes: light mode remaps the neutral
  and accent scales in `app/globals.css` instead of duplicating styles.

## Run it

```bash
bun install
bun run dev        # http://localhost:3000
bun run build      # production build + sitemap
bun run typecheck
```

## Where things live

| Path | What |
| --- | --- |
| `lib/site.ts` | Name, role, availability, links — the one place to update them |
| `lib/metadata.ts` | Per-page SEO metadata (canonical, Open Graph, X, RSS link) |
| `data/` | Projects, experience, skills, uses, socials, graveyard |
| `content/blog/` | Posts (the filename is the URL) |
| `components/page-shell.tsx` | Frame for every page except the homepage |

## License

Content is © Aditya Bhaskar Sharma, licensed CC BY-NC-ND 4.0 with additional
AI-use restrictions — see [adi.codes/license](https://adi.codes/license).
