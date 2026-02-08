# 01 — Full Site Rebuild: MkDocs to Astro

## What Changed

Rebuilt sauravbhatia.com from a MkDocs Material site to an Astro static site with a new "Dark Instrument Panel" design system. Moved hosting target from Netlify to Cloudflare Pages.

## Why

The old site had a "Gold Standard" editorial magazine aesthetic — warm golds, Newsreader serif, cream backgrounds — that read as "senior banker." It didn't represent the multi-dimensional founder (DJ, superbikes, watches, drones, coding). The new design uses dark backgrounds with electric cyan accents and instrument-panel aesthetics to communicate tech, speed, and precision.

## Framework

- **From:** MkDocs Material (Python, Jinja templates, `mkdocs.yml`)
- **To:** Astro 5.x (static output, content collections, zero JS by default)
- **Hosting:** Cloudflare Pages (was Netlify). Contact form runs as a Cloudflare Pages Function.

## Design System

### Colors
| Token | Value | Usage |
|---|---|---|
| `--bg-void` | `#0A0A0B` | Body background |
| `--bg-surface` | `#111113` | Cards, raised surfaces |
| `--bg-elevated` | `#1A1A1F` | Hover states |
| `--accent` | `#00F0FF` | Electric cyan — links, CTAs, active states |
| `--accent-2` | `#8B5CF6` | Ultraviolet — category badges |
| `--accent-3` | `#FF3366` | Signal red — sparingly |
| `--text-1` | `#F0F0F5` | Headings |
| `--text-2` | `#F0F0F599` | Body text (60% opacity) |
| `--text-3` | `#F0F0F54D` | Metadata (30% opacity) |

### Typography
| Role | Font | Usage |
|---|---|---|
| Headings | Space Grotesk | Geometric, technical |
| Body | Inter | Legibility |
| Mono | JetBrains Mono | Labels, metadata, code — gives "instrument panel" feel |

### Spacing
8px base grid (`--sp-1` through `--sp-16`). All margins/padding are multiples of 8.

### Motion
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` — acceleration curve like braking from speed
- Hero entrance: staggered fade+slide-up (0.2s–1.4s delays)
- Scroll reveals: IntersectionObserver, 0.6s transitions, 0.08s stagger between children
- Card hovers: translate-up 4px, cyan border glow, 0.25s

## Pages Built

### Home (`src/pages/index.astro`)
1. **Hero** — full viewport, monospace eyebrow, large headline with cyan "build", cursor-following radial glow, grid overlay, scanline animation, Singapore coordinates, scroll hint
2. **Latest Writing** — queries content collection for 3 most recent posts, 3-column card grid, category badges, hover effects
3. **About Teaser** — narrative + "At a Glance" data card (cockpit readout style with pulsing indicator)
4. **Book Feature** — banner card with stats grid (81K+ Words, 775 Citations, 12 Chapters, 20 Frameworks)
5. **Contact CTA** — centered banner with button

### About (`src/pages/about.astro`)
- Career timeline (6 entries, vertical layout, glowing current-role dot)
- Education cards (NUS MBA, Oxford Blockchain)
- Book feature card
- Connect section with social links

### Blog Index (`src/pages/blog/index.astro`)
- Category filter pills (All, Startups, Investing, Crypto, Weekly Recap) — JS filtering
- Post list cards with hover translateX effect

### Blog Post (`src/pages/blog/[...slug].astro`)
- Post header with back link, metadata, title
- Prose content styling (headings, images, blockquotes, links)
- Previous/next post navigation

### Contact (`src/pages/contact.astro`)
- Form (name, email, message) with cyan focus glow
- Submits to `/api/contact` (Cloudflare Pages Function)
- Sidebar card with social link alternatives

### 404 (`src/pages/404.astro`)
- Minimal error page with back-to-home link

### RSS (`src/pages/rss.xml.ts`)
- Full RSS feed of all blog posts

## File Structure

```
sb-website/
├── astro.config.mjs              # Astro config (static, sitemap, trailingSlash)
├── package.json                   # Astro 5.17, @astrojs/rss, @astrojs/sitemap, gsap
├── tsconfig.json
├── .gitignore                     # Updated for Astro (dist/, .astro/)
├── functions/
│   └── api/
│       └── contact.ts             # Cloudflare Pages Function (ZeptoMail)
├── src/
│   ├── content.config.ts          # Blog collection schema (title, description, date, category)
│   ├── components/
│   │   └── layout/
│   │       ├── BaseLayout.astro   # HTML shell, meta tags, fonts, OG tags
│   │       ├── Header.astro       # Fixed nav, scroll blur, mobile toggle
│   │       └── Footer.astro       # Copyright, social icons (LinkedIn, X, GitHub)
│   ├── content/
│   │   └── blog/                  # 5 migrated markdown posts
│   │       ├── 12-things-i-learned-from-building-digital-ventures.md
│   │       ├── 10-investing-lessons-part-1.md
│   │       ├── 10-investing-lessons-part-2.md
│   │       ├── the-weekly-recap-ep1.md
│   │       └── top-5-crypto-currencies.md
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── 404.astro
│   │   ├── rss.xml.ts
│   │   └── blog/
│   │       ├── index.astro
│   │       └── [...slug].astro
│   └── styles/
│       └── global.css             # Design tokens, reset, typography, utilities
└── public/
    └── images/                    # Copied from docs/images/
        ├── blog/                  # 38 blog post images
        ├── hero/                  # Hero images
        └── icons/                 # Brand SVGs
```

## Blog Migration

### Frontmatter Changes
```yaml
# Old (MkDocs)                    # New (Astro)
date: 2021-08-03                  title: "Top 5 Crypto Currencies..."
categories:                       description: "What?? there is more..."
  - Crypto                        date: 2021-08-03
authors:                          category: "Crypto"
  - saurav                        author: "Saurav Bhatia"
```

### Other Changes
- Titles moved from markdown H1 into frontmatter `title` field
- Excerpts from `<!-- more -->` markers moved into `description` field
- Image paths: `../../images/blog/` → `/images/blog/`
- Inter-post links: `10-investing-lessons-part-2.md` → `/blog/10-investing-lessons-part-2/`

## Contact Form

Ported from Netlify Functions (`netlify/functions/contact.js`) to Cloudflare Pages Function (`functions/api/contact.ts`). Same ZeptoMail API logic, uses Cloudflare Worker `Request`/`Response` API. Requires `ZEPTOMAIL_API_KEY` as Cloudflare env var.

## URL Preservation

All blog post URLs match the old MkDocs slugs:
- `/blog/12-things-i-learned-from-building-digital-ventures/`
- `/blog/10-investing-lessons-part-1/`
- `/blog/10-investing-lessons-part-2/`
- `/blog/the-weekly-recap-ep1/`
- `/blog/top-5-crypto-currencies/`

Trailing slashes enforced via `trailingSlash: 'always'` in Astro config.

## Deployment (Pending)

Target: Cloudflare Pages. Steps:
1. `npm run build` → static output to `dist/`
2. Deploy via `npx wrangler pages deploy dist/` or connect GitHub repo
3. Set `ZEPTOMAIL_API_KEY` in Cloudflare dashboard
4. Point DNS for sauravbhatia.com to Cloudflare

## Old Files Still Present

The MkDocs files (`docs/`, `mkdocs.yml`, `requirements.txt`, `netlify.toml`, `netlify/`, `site/`) are still in the repo. They can be removed once the Astro site is verified in production.
