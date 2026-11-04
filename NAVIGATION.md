# Navigation

## Homepage (`app/home-client.tsx`)

- **Desktop**: left panel (hero, then a blurb for whichever section you're in,
  from `data/left-panel-content.ts`), vertical section nav, scrolling right
  panel. The active section is whichever one crosses the middle of the
  viewport (`components/right-panel.tsx`); the URL hash follows it without
  scrolling.
- **Phones**: the left panel is hidden, so `components/mobile-intro.tsx` opens
  the page with name, role, availability, email and résumé. The bottom nav
  (`components/mobile-navigation/`) has About, Projects, Experience, Hire Me
  and More; More holds the remaining sections plus résumé, all projects, blog
  and a theme toggle.
- **Notes** is always in the nav. With every post still a draft it shows
  placeholder cards (`components/blog-showcase.tsx`).

## Every other page (`components/page-shell.tsx`)

`/blog`, the posts, `/projects`, `/graveyard`, `/license` and the 404 all
render inside `PageShell`, which gives them:

- **TerminalNav** (`components/terminal-nav.tsx`): sticky bar with the current
  path, a theme toggle, and breadcrumbs. `⌥/Alt + H` goes home, `⌥/Alt + B`
  goes one level up the breadcrumbs. Shortcuts use `KeyboardEvent.code`,
  because on a Mac Option+H types "˙".
- **AvailabilityCta**: the "Hiring? I'm available." card (hidden on
  `/license`).
- **SubpageFooter**: email, LinkedIn, GitHub, résumé, RSS, license.
- **FloatingQuickNav**: appears after scrolling; Home, Projects, Blog, scroll
  to top.

```tsx
<PageShell
	currentPath="~/blog/my-article"
	breadcrumbs={[
		{ label: 'blog', href: '/blog', command: 'cd' },
		{ label: 'my-article', href: '/blog/my-article' },
	]}
	availability="blog-post">
	…page content…
</PageShell>
```

`availability` is the analytics label for the closing card; pass `false` to
hide it.
