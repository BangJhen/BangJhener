"use client";

import { LinkPreview } from "@/components/ui/link-preview";
import { ScrollFloat } from "@/components/ui/scroll-float";
import {
  missionMetrics,
  skillConstellation,
  featuredProjects,
  experienceTimeline,
} from "@/data/portfolio";

export default function PortfolioSection({ styles }) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionShell}>
        <div className={styles.sectionIntro}>
          <p className={styles.sectionEyebrow}>Portfolio Constellation</p>
          <ScrollFloat
            as="h2"
            reverse
            scrollStart="top top+=78%"
            scrollEnd="bottom top+=35%"
            stagger={0.012}
            reverseToYPercent={-40}
            reverseToScaleY={1.1}
            reverseToScaleX={0.95}
            containerClassName={styles.sectionTitle}
            textClassName={styles.sectionTitleText}>
            Crafting Intelligent Products Between Data and Space
          </ScrollFloat>
          <p className={styles.sectionLead}>
            This portfolio map highlights my profile, technical stack, selected projects, and ongoing mission in AI/ML and modern web engineering.
          </p>
        </div>

        <div className={styles.sectionGrid}>
          <article className={`${styles.panel} ${styles.panelWide}`}>
            <h3 className={styles.panelHeading}>Mission Profile</h3>
            <p className={styles.panelBody}>
              I design and ship digital experiences where machine intelligence, product thinking, and cinematic interfaces work as one system.
            </p>
            <div className={styles.missionMetrics}>
              {missionMetrics.map((metric) => (
                <div key={metric.label} className={styles.metricCard}>
                  <span className={styles.metricValue}>{metric.value}</span>
                  <span className={styles.metricLabel}>{metric.label}</span>
                </div>
              ))}
            </div>
          </article>

          <article className={styles.panel}>
            <h3 className={styles.panelHeading}>Skills Constellation</h3>
            <p className={styles.panelBody}>Core technologies I use to train models, build products, and deploy robust end-to-end systems.</p>
            <div className={styles.skillCloud}>
              {skillConstellation.map((skill) => (
                <span key={skill} className={styles.skillChip}>
                  {skill}
                </span>
              ))}
            </div>
          </article>

          <article className={`${styles.panel} ${styles.panelWide}`}>
            <h3 className={styles.panelHeading}>Featured Projects</h3>
            <div className={styles.projectGrid}>
              {featuredProjects.map((project) => (
                <article key={project.title} className={styles.projectCard}>
                  <p className={styles.projectType}>{project.type}</p>
                  <h4 className={styles.projectTitle}>{project.title}</h4>
                  <p className={styles.projectSummary}>{project.summary}</p>
                  <p className={styles.projectStack}>{project.stack}</p>
                  <div className={styles.projectActions}>
                    {project.previewImage ? (
                      <LinkPreview
                        url={project.href}
                        title={project.previewTitle}
                        description={project.previewDescription}
                        imageSrc={project.previewImage}
                        imageAlt={project.previewAlt}
                        showDetails={false}
                        positionMode="anchor"
                        previewOffsetY={0}
                        className={styles.projectLink}
                        cardClassName={styles.heroLinkCard}>
                        {project.linkLabel}
                      </LinkPreview>
                    ) : (
                      <a href={project.href} target="_blank" rel="noreferrer noopener" className={styles.projectLink}>
                        {project.linkLabel}
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </article>

          <article className={styles.panel}>
            <h3 className={styles.panelHeading}>Experience Orbit</h3>
            <ul className={styles.timeline}>
              {experienceTimeline.map((item) => (
                <li key={item.role} className={styles.timelineItem}>
                  <p className={styles.timelinePeriod}>{item.period}</p>
                  <h4 className={styles.timelineRole}>{item.role}</h4>
                  <p className={styles.timelineDetail}>{item.detail}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className={styles.panel}>
            <h3 className={styles.panelHeading}>Contact Dock</h3>
            <p className={styles.panelBody}>Open to collaboration on AI products, interactive web platforms, and end-to-end data-driven systems.</p>
            <div className={styles.contactList}>
              <a className={styles.contactLink} href="mailto:ammar@example.com">
                Email Mission Control
              </a>
              <a className={styles.contactLink} href="https://github.com" target="_blank" rel="noreferrer noopener">
                GitHub Hangar
              </a>
              <a className={styles.contactLink} href="https://linkedin.com" target="_blank" rel="noreferrer noopener">
                LinkedIn Channel
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
