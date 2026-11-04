# Writing a blog post

Everything below is what the code in `lib/mdx.ts`, `app/blog/[slug]/page.tsx`,
`app/feed.xml/route.ts` and `components/blog/` actually does today — not what
it could do.

## The whole workflow

```bash
bun run post:new "Why I chose Swift over React Native"   # 1. scaffold a draft
bun run dev                                              # 2. write; the page hot-reloads
bun run post:publish why-i-chose-swift-over-react-native # 3. check it, date it, un-draft it
git add content/blog && git commit -m "post: …" && git push   # 4. that's the button
```

`post:publish` refuses to publish a post that would ship broken: placeholder
description, missing title, images without alt text, an image path that doesn't
exist, or MDX that won't compile. It warns (but lets you through) on length,
missing tags and a missing internal link. It sets `date` to today — add
`--keep-date` to leave it as written — and prints the exact git command.

Once the push deploys, the post is automatically:

- live at `/blog/<filename>` with its own title, description, canonical URL,
  Open Graph + X card, generated social image, and `BlogPosting` + breadcrumb
  structured data;
- listed on `/blog` and in the homepage "Notes" section. Both are always
  linked; with nothing published they show an "in drafts" placeholder, and
  `/blog` stays `noindex` and out of the sitemap until the first post ships;
- in `sitemap.xml` with its real `lastmod`;
- in the RSS feed at `/feed.xml`, with the full post as HTML;
- offered as a related post at the bottom of other posts that share a tag;
- closed by the "Hiring? I'm available." card, so a reader from search is one
  tap from email, résumé and LinkedIn.

There is no database and no admin panel. The file **is** the post.

## The filename is the URL

`content/blog/choosing-swift-over-react-native.md` → `/blog/choosing-swift-over-react-native`

Rename the file and the URL changes, which breaks every existing link to it and
makes Google re-index from scratch. **Pick the filename once and don't rename
it after publishing.** There is no redirect handling for posts.

`post:new` builds the filename from the title (lowercase, hyphens, articles
dropped). Rename it before you publish if you want something shorter. The build
fails on a published post whose filename isn't lowercase-words-and-hyphens.

> Anything ending in `.md` or `.mdx` inside `content/blog/` becomes a post.
> Don't put notes or READMEs in that folder.

## Frontmatter

```markdown
---
title: 'Why I chose Swift over React Native: An important realization'
date: '2025-11-03'
description: 'A 140–160 character summary. This is the grey text under the title in Google results and the text in a link preview on Threads or LinkedIn.'
status: 'draft'
tags: ['iOS', 'Design', 'Indie Dev']
---
```

| Field | Required | What it does |
| --- | --- | --- |
| `title` | **yes** | The `<h1>`, browser tab, Google headline, social image text, listing card, RSS item. Aim for 50–60 characters. |
| `date` | **yes** | Sort order, displayed date, `datePublished`, sitemap `lastmod`, RSS `pubDate`. `'YYYY-MM-DD'`. Quotes optional. |
| `description` | **yes** | Meta description, social description, listing summary, social image subtitle, RSS description. 140–160 characters, unique per post. |
| `status` | no | `'draft'` hides the post from the deployed site, the sitemap and the feed. Absent means published. |
| `tags` | no | Shown under the post title, on the listing card, in meta keywords, `article:tag`, JSON-LD, RSS categories — and they decide which posts appear as "more articles". |
| `updated` | no | `'YYYY-MM-DD'`. Shows "--updated" on the post and sets `dateModified`, `og:modified_time` and the sitemap `lastmod`. Add it when you meaningfully revise an old post. |

A published post missing `title`, `description` or `date` (or with an invalid
date) **fails the build** with the filename and what's wrong. Drafts only warn.

### Fields that do nothing

- `slug` — the filename is the slug.
- `image` / `ogImage` — every post's social image is generated at
  `/api/og/<slug>` from the title and description.
- `canonical` — always `/blog/<filename>`.
- `readingTime` — computed from the word count at 200 wpm.
- `author` — it's always you (`lib/site.ts`).

## What the body supports

Standard markdown plus GitHub-flavoured markdown:

- `## Heading` / `### Heading` — automatic ids and self-links, so sections are
  deep-linkable. **Start at `##`.** A `#` in the body is rendered as `##`
  anyway, because the title is the page's only `<h1>`.
- `**bold**`, `_italic_`, `> quote`, `---`, lists, `- [ ] task lists`
- `[text](https://…)` opens in a new tab; `[text](/projects)` stays on the site.
  Outbound clicks are tracked in GA.
- Tables (they scroll sideways on phones instead of breaking the layout),
  `~~strikethrough~~`.
- ` ```swift ` fenced code — highlighted, line numbers, copy button.
- `![alt text](/assets/images/thing.png)` — put the file in `public/`. **Always
  write alt text**; `post:publish` refuses images without it. Images are
  served as-is (`images: { unoptimized: true }`), so resize first — WebP at
  ~1280px wide is a good default (`cwebp -q 80 -resize 1280 0 in.png -o out.webp`).

### The one real gotcha coming from WordPress

These files are compiled as **MDX**, where `{` and `<` mean code:

| You write | What happens |
| --- | --- |
| `<https://adi.codes>` | Build error. Use `[adi.codes](https://adi.codes)`. |
| `<me@adi.codes>` | Build error. Use `[email me](mailto:me@adi.codes)`. |
| `Use the { character` | Build error — an unclosed brace. |
| `Costs {99} a year` | **Silently renders as `Costs 99 a year`.** |

Escape a literal brace or angle bracket with a backslash: `\{`, `\<`, or use
inline code. `bun run test:mdx` (and `post:publish`) compiles every post with
the site's MDX setup and reports these with the line number.

## Checks

```bash
bun run test:mdx            # compile every post (or: bun run test:mdx <slug>)
bun run seo:score           # per-post score + recommendations
bun run lint:all            # markdown lint, dead links, prose lint
bun run build               # the full build — the final word
```

## Drafts and previews

Drafts appear with an amber `draft` badge locally — in `bun run dev` and a
local production build — and are stripped from anything deployed (Vercel/CI):
not rendered, not linked, not in the sitemap or feed, and the URL 404s.
`SHOW_DRAFTS=1` / `SHOW_DRAFTS=0` forces it either way.

## After publishing: distribution

The feed at `https://adi.codes/feed.xml` (also reachable at `/rss`) is what
other platforms plug into:

- **dev.to** — Settings → Extensions → "Publishing to DEV Community from RSS".
  Set the canonical URL to the adi.codes post so search credit stays here.
- **Hashnode** — import from RSS, same canonical rule.
- **daily.dev** — submit the blog as a source with the feed URL.

## Writing somewhere nicer than a code editor

Obsidian (open `content/blog/` as a vault) or iA Writer both edit the real
files. Keep `bun run dev` running to see the styled post as you save.

## Not done (on purpose)

- **Tag pages** (`/blog/tag/ios`): with a handful of posts they'd be thin,
  near-duplicate pages. Tags already drive related posts. Revisit at ~15 posts.
- **Redirects for renamed posts**: add them to `redirects()` in
  `next.config.js` if you ever have to rename one.
