import type { ProjectItem } from '../data/siteContent';

export interface ContactFormValues {
  name: string;
  email: string;
  topic: string;
  message: string;
  website: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function filterProjects(
  projects: ProjectItem[],
  activeCategory: string,
  showAll: boolean,
  initialCount: number
): { filtered: ProjectItem[]; visible: ProjectItem[]; hasMore: boolean } {
  const filtered =
    activeCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === activeCategory);
  const visible = showAll ? filtered : filtered.slice(0, initialCount);
  const hasMore = filtered.length > initialCount;
  return { filtered, visible, hasMore };
}

export function getRelatedProjects(
  projects: ProjectItem[],
  currentSlug: string,
  count = 2
): ProjectItem[] {
  const currentIndex = projects.findIndex((p) => p.slug === currentSlug);
  if (currentIndex === -1 || projects.length <= 1) return [];
  const results: ProjectItem[] = [];
  for (let offset = 1; offset <= count; offset++) {
    const candidate = projects[(currentIndex + offset) % projects.length];
    if (candidate && candidate.slug !== currentSlug && !results.some((r) => r.slug === candidate.slug)) {
      results.push(candidate);
    }
  }
  return results;
}

export function validateContactForm(
  values: Pick<ContactFormValues, 'name' | 'email' | 'topic' | 'message'>,
  allowedTopics: readonly string[]
): ContactFormErrors {
  const errors: ContactFormErrors = {};
  const trimmedName = values.name.trim();
  const trimmedEmail = values.email.trim();
  const trimmedMessage = values.message.trim();

  if (!trimmedName) {
    errors.name = 'Please enter your name.';
  } else if (trimmedName.length > 100) {
    errors.name = 'Name must be 100 characters or fewer.';
  }

  if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email.';
  }

  if (!allowedTopics.includes(values.topic)) {
    errors.topic = "Please choose what it's about.";
  }

  if (trimmedMessage.length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  } else if (trimmedMessage.length > 2000) {
    errors.message = 'Message must be 2000 characters or fewer.';
  }

  return errors;
}

export interface SpotlightState {
  x: number;
  y: number;
  tx: number;
  ty: number;
  s: number;
  ts: number;
}

export function stepSpotlight(
  state: SpotlightState,
  deltaMs: number,
  reducedMotion: boolean,
  lerpFactor = 0.15,
  fadeDurationMs = 300
): { next: SpotlightState; smoothScale: number; done: boolean } {
  const clampedDelta = Math.min(deltaMs, 50);
  const next = { ...state };

  if (reducedMotion) {
    next.x = next.tx;
    next.y = next.ty;
    next.s = next.ts;
  } else {
    next.x += (next.tx - next.x) * lerpFactor;
    next.y += (next.ty - next.y) * lerpFactor;
    const step = clampedDelta / fadeDurationMs;
    next.s = next.ts > next.s ? Math.min(next.ts, next.s + step) : Math.max(next.ts, next.s - step);
  }

  const smoothScale = next.s * next.s * (3 - 2 * next.s);
  const done =
    Math.abs(next.tx - next.x) < 0.1 &&
    Math.abs(next.ty - next.y) < 0.1 &&
    next.s === next.ts;

  return { next, smoothScale, done };
}
