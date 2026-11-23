import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS, SITE } from '../data/siteContent';
import { prefersReducedMotion } from '../utils/media';
import { filterProjects } from '../utils/portfolioLogic';
import { ProjectCard } from './ProjectCard';
import { PillButton, SectionHeading } from './UIPrimitives';

export function SelectedWork() {
  const { work } = SITE;
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [appliedFilter, setAppliedFilter] = useState<string>('All');
  const [showAll, setShowAll] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const { visible: visibleProjects, hasMore } = filterProjects(
    PROJECTS,
    appliedFilter,
    showAll,
    work.initialCount
  );

  const handleFilterChange = (filter: string) => {
    if (filter === selectedFilter) return;
    setSelectedFilter(filter);
    const children = gridRef.current?.children;
    if (prefersReducedMotion() || !children?.length) {
      setAppliedFilter(filter);
      return;
    }
    gsap.to(children, {
      y: 24,
      opacity: 0,
      duration: 0.25,
      stagger: 0.04,
      ease: 'power2.in',
      onComplete: () => setAppliedFilter(filter),
    });
  };

  useLayoutEffect(() => {
    if (isFirstRender.current || !gridRef.current) {
      isFirstRender.current = false;
      return;
    }
    if (!prefersReducedMotion()) {
      gsap.fromTo(
        gridRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.07,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
        }
      );
    }
    ScrollTrigger.refresh();
  }, [appliedFilter, showAll]);

  return (
    <section className="section work" id="work" aria-labelledby="work-title" tabIndex={-1}>
      <div className="container">
        <SectionHeading id="work-title" label={work.label} watermark={work.watermark} />

        <div className="work__toolbar">
          <div className="work__filters" role="group" aria-label="Filter projects">
            {work.filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`work__filter${selectedFilter === filter ? ' is-active' : ''}`}
                aria-pressed={selectedFilter === filter}
                onClick={() => handleFilterChange(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          {hasMore && (
            <PillButton
              variant="light"
              onClick={() => setShowAll((prev) => !prev)}
              aria-expanded={showAll}
            >
              {showAll ? work.showLess : work.viewAll}
            </PillButton>
          )}
        </div>

        <div className="work__grid" ref={gridRef} data-testid="work-grid">
          {visibleProjects.map((project) => (
            <div key={project.slug} className="work__item">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {visibleProjects.length === 0 && <p className="notice">{work.empty}</p>}
      </div>
    </section>
  );
}
