import type { CollectionEntry } from 'astro:content';

type Post = CollectionEntry<'posts'>;

/** Resolve the URL slug for a post: frontmatter slug or filename. */
export function getSlug(post: Post): string {
  if (post.data.slug) return post.data.slug;
  // id from glob loader is path relative to base, e.g. "investing/10-investing-lessons-part-1"
  const parts = post.id.split('/');
  return parts[parts.length - 1];
}

/** Full URL path for a post. */
export function getPostUrl(post: Post): string {
  return `/blog/${getSlug(post)}/`;
}

/** Estimated read time in minutes (250 wpm). */
export function estimateReadTime(body: string): number {
  const words = body.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 250));
}

/** Format a date as "Feb 8, 2026". */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/** Format a date as "February 8, 2026". */
export function formatDateLong(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}
