# Navigation System Documentation

## Overview

I've created a unique, terminal-themed navigation system for your blog pages that maintains your site's aesthetic while providing excellent UX.

## Components Created

### 1. **TerminalNav** (`/components/terminal-nav.tsx`)

A sticky top navigation bar that mimics a terminal interface.

#### Features:

- **Terminal Window Header**: Shows current path with pulsing cursor
- **Breadcrumb Navigation**: Unix-style with `cd` commands
- **Keyboard Shortcuts**:
    - `Alt/Option + H` → Go to homepage
    - `Alt/Option + B` → Go back/to blog index
- **Current Path Display**: Shows `pwd` output on desktop
- **Fully Responsive**: Hides keyboard hints on mobile

#### Usage:

```tsx
<TerminalNav
	currentPath="~/blog/my-article"
	breadcrumbs={[
		{ label: 'blog', href: '/blog', command: 'cd' },
		{ label: 'my-article', href: '/blog/my-article' },
	]}
/>
```

### 2. **FloatingQuickNav** (`/components/floating-quick-nav.tsx`)

A floating action button with expandable menu that appears after scrolling 200px.

#### Features:

- **Scroll Progress Ring**: Visual indicator of page scroll position
- **Expandable Menu**: Click to reveal navigation options
- **Quick Links**: Home and Blog links with keyboard shortcuts
- **Scroll to Top**: Shows percentage scrolled
- **Smooth Animations**: Framer Motion transitions
- **Terminal Aesthetic**: Matches your overall design

#### Usage:

```tsx
<FloatingQuickNav />
```

## Integration

Both components have been integrated into:

- ✅ Blog index page (`/app/blog/page.tsx`)
- ✅ Single blog post page (`/components/blog/animated-blog-post-new.tsx`)

## Design Philosophy

### Terminal-First

Every element uses terminal/command-line metaphors:

- File system paths (`~/blog/article`)
- Unix commands (`cd`, `pwd`, `ls`)
- Monospace fonts
- Command prompts (`$`, `➜`)

### Keyboard Accessibility

Power users can navigate without touching the mouse using keyboard shortcuts.

### Visual Hierarchy

- Emerald green for active/interactive elements
- Neutral grays for background/inactive states
- Dashed borders for that retro terminal feel
- Pulsing cursor animations

### Responsive Design

- Desktop: Full features with keyboard hints
- Mobile: Optimized layout, essential features only
- Floating nav appears on scroll for quick access

## Customization

### Adding More Navigation Items

Edit `/components/floating-quick-nav.tsx`:

```tsx
const navItems: QuickNavItem[] = [
	{
		label: 'Home',
		href: '/',
		icon: <Home className="h-4 w-4" />,
		shortcut: '⌥H',
	},
	{
		label: 'Projects', // New item
		href: '/projects',
		icon: <Folder className="h-4 w-4" />,
		shortcut: '⌥P',
	},
]
```

### Changing Colors

The components use Tailwind classes:

- `text-emerald-500` → Primary accent
- `bg-neutral-900` → Background
- `border-neutral-800` → Borders

### Adjusting Scroll Trigger

In `FloatingQuickNav`:

```tsx
setIsVisible(window.scrollY > 200) // Change 200 to your preferred value
```

## Future Enhancements

Consider adding:

1. **Search functionality** → Terminal-style search bar
2. **Recent posts** → Show in quick nav menu
3. **Category navigation** → Filter posts by tags
4. **Reading progress bar** → For single posts
5. **Share buttons** → Terminal-styled social sharing

## Technical Notes

- **Server/Client Split**: Blog pages use server components for data fetching, client components for interactivity
- **Performance**: Floating nav only renders after scroll, minimizing initial bundle
- **Accessibility**: Keyboard navigation, ARIA labels, semantic HTML
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)

---

Built with ❤️ using Next.js 14+, Framer Motion, and Lucide Icons
