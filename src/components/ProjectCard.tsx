import React from 'react';
import type { ProjectItem } from '../data/siteContent';
import { usePageTransition } from '../context/PageTransitionContext';
import { resolveProjectImage } from '../utils/media';
import { ArrowUpRightIcon } from './Icons';
import { MediaImage, TagPill } from './UIPrimitives';

interface ProjectCardProps {
  project: ProjectItem;
  headingLevel?: 2 | 3 | 4;
}

export function ProjectCard({ project, headingLevel = 3 }: ProjectCardProps) {
  const transitionTo = usePageTransition();
  const { slug, title, summary, category, tags = [], images = [] } = project;
  const href = `/work/${slug}`;
  const HeadingTag = `h${headingLevel}` as 'h2' | 'h3' | 'h4';
  const cover = resolveProjectImage(images[0] ?? null);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    transitionTo(href);
  };

  return (
    <article className="project-card">
      <a className="project-card__link" href={href} onClick={handleClick}>
        <div className="project-card__media">
          <MediaImage {...cover} alt={`Preview of the ${title} project`} className="project-card__img" />
          <span className="project-card__badge">{category}</span>
          <span className="project-card__go" aria-hidden="true">
            <ArrowUpRightIcon size={20} />
          </span>
        </div>
        <HeadingTag className="project-card__title">
          {title}
          {summary && <span className="project-card__summary"> — {summary}</span>}
        </HeadingTag>
      </a>

      {tags.length > 0 && (
        <ul className="project-card__tags" aria-label="Tags">
          {tags.map((tag) => (
            <li key={tag}>
              <TagPill>{tag}</TagPill>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
