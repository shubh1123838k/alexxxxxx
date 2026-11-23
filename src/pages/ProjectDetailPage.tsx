import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { useParams } from 'react-router-dom';
import { PROJECTS, SITE, type ProjectItem } from '../data/siteContent';
import { usePageTransition } from '../context/PageTransitionContext';
import { prefersReducedMotion, resolveProjectImage } from '../utils/media';
import { getRelatedProjects } from '../utils/portfolioLogic';
import { ContactCTA } from '../components/ContactCTA';
import { ArrowLeftIcon, GitHubIcon, TECH_ICONS } from '../components/Icons';
import { ProjectCard } from '../components/ProjectCard';
import { MediaImage, PillButton, StatusPill, TagPill } from '../components/UIPrimitives';
import { NotFoundPage } from './NotFoundPage';

function ProjectDetailContent({ project }: { project: ProjectItem }) {
  const copy = SITE.project;
  const articleRef = useRef<HTMLElement>(null);
  const {
    title,
    category,
    tags = [],
    description,
    details,
    role,
    timeline,
    tools = [],
    liveUrl,
    githubUrl,
    codeNote,
  } = project;

  const images = project.images?.length ? project.images : [null, null];

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !articleRef.current) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ delay: 0.6, defaults: { ease: 'power3.out' } })
        .fromTo(
          '.detail__letter',
          { yPercent: 80, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.035 }
        )
        .fromTo(
          '[data-detail-fade]',
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 },
          '-=0.5'
        );

      gsap.utils.toArray<HTMLElement>('.detail__frame, .detail__text-card').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          }
        );
      });
    }, articleRef);

    return () => ctx.revert();
  }, [project.slug]);

  return (
    <article ref={articleRef}>
      <div className="container detail__intro">
        <div className="detail__main">
          {tags.length > 0 && (
            <ul className="detail__tags" aria-label="Tags" data-detail-fade="true">
              {tags.map((tag) => (
                <li key={tag}>
                  <TagPill tone="white">{tag}</TagPill>
                </li>
              ))}
            </ul>
          )}

          <h1 className="detail__title">
            <span className="sr-only">{title}</span>
            <span className="detail__title-text" aria-hidden="true">
              {[...title].map((char, idx) => (
                <span key={idx} className="detail__letter">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
            <span className="detail__category">/{category}</span>
          </h1>

          <p className="detail__desc" data-detail-fade="true">
            {description}
          </p>

          <div className="detail__actions" data-detail-fade="true">
            {liveUrl && (
              <PillButton href={liveUrl} external>
                {copy.live}
              </PillButton>
            )}
            {githubUrl && (
              <PillButton href={githubUrl} external variant="light" arrow={false} icon={<GitHubIcon />}>
                {copy.code}
              </PillButton>
            )}
            {!githubUrl && codeNote && <span className="detail__code-note">{codeNote}</span>}
          </div>
        </div>

        <dl className="detail__meta" data-detail-fade="true">
          <div>
            <dt>{copy.role}</dt>
            <dd>{role || '—'}</dd>
          </div>
          <div>
            <dt>{copy.timeline}</dt>
            <dd>{timeline || '—'}</dd>
          </div>
          <div>
            <dt>{copy.tools}</dt>
            <dd>
              {tools.length > 0 ? (
                <ul className="detail__tools">
                  {tools.map((tool) => {
                    const iconInfo = TECH_ICONS[tool];
                    return (
                      <li key={tool} title={tool} className={iconInfo ? '' : 'detail__tool--text'}>
                        {iconInfo ? (
                          <>
                            <iconInfo.Icon aria-hidden="true" color={iconInfo.color} size={20} />
                            <span className="sr-only">{tool}</span>
                          </>
                        ) : (
                          tool
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                '—'
              )}
            </dd>
          </div>
        </dl>
      </div>

      <div className="container detail__gallery">
        {images.map((img, idx) => (
          <div key={idx} className="detail__gallery-item">
            <figure className="detail__frame">
              <MediaImage
                {...resolveProjectImage(img)}
                alt={`${title} screenshot ${idx + 1} of ${images.length}`}
              />
            </figure>
            {idx === 0 && details && (
              <div className="detail__text-card">
                <h2>{copy.about}</h2>
                <p>{details}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </article>
  );
}

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const transitionTo = usePageTransition();
  const { work, project: projectCopy } = SITE;
  const project = PROJECTS.find((p) => p.slug === slug);

  useEffect(() => {
    if (project) {
      document.title = `${project.title} | ${SITE.name.first} ${SITE.name.last}`;
    }
  }, [project]);

  if (!project) {
    return <NotFoundPage />;
  }

  const related = getRelatedProjects(PROJECTS, project.slug, 2);

  const handleBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    transitionTo('/', { target: '#work' });
  };

  return (
    <div className="detail-page">
      <header className="detail-topbar">
        <PillButton
          href="/"
          onClick={handleBack}
          variant="light"
          arrow={false}
          icon={<ArrowLeftIcon />}
        >
          {projectCopy.back}
        </PillButton>
        <StatusPill>{SITE.status}</StatusPill>
      </header>

      <main id="main">
        <ProjectDetailContent key={project.slug} project={project} />

        {related.length > 0 && (
          <section className="detail__more" aria-labelledby="more-title">
            <div className="container">
              <h2 className="detail__more-title" id="more-title">
                {work.more}
              </h2>
              <div className="work__grid">
                {related.map((item) => (
                  <div key={item.slug} className="work__item">
                    <ProjectCard project={item} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <ContactCTA />
      </main>
    </div>
  );
}
