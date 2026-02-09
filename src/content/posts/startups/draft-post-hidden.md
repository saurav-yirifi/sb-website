---
title: "Draft Post — Should Be Hidden (Test)"
description: "A test post with draft: true. Should be visible in dev mode but excluded from production build listings."
date: 2026-02-08
tags: [startups]
draft: true
---

## This is a draft test post

This post exists to verify that:

- It is **visible** when navigating directly to `/blog/draft-post-hidden/` in dev mode
- It is **excluded** from the `/blog/` listing page
- It is **excluded** from `/blog/tag/startups/`
- It is **excluded** from the RSS feed
- It is **excluded** from the homepage "Latest Writing" section
- In production build, this page should still be generated (Astro generates all paths from `getStaticPaths`) but it won't appear in any listing
