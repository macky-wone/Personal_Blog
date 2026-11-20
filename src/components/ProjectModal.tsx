import React, { useEffect, useId, useRef } from 'react';
import { Language, ProjectItem } from '../types';
import { getPortfolioContent } from '../data/cvData';
import { closeTopLayer, handleDialogBackdropClickFallback } from '../utils/modernWeb';
import { ProjectVisual } from './ProjectVisual';

interface ProjectModalProps {
  project: ProjectItem | null;
  lang: Language;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, lang, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const labels = getPortfolioContent(lang).ui.projectModal;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (project) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      void closeTopLayer(dialog);
    }
  }, [project]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (event: Event) => {
      event.preventDefault();
      void closeTopLayer(dialog);
    };

    const handleClose = () => {
      onClose();
    };

    dialog.addEventListener('cancel', handleCancel);
    dialog.addEventListener('close', handleClose);
    return () => {
      dialog.removeEventListener('cancel', handleCancel);
      dialog.removeEventListener('close', handleClose);
    };
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      className="modern-dialog project-detail-dialog"
      aria-labelledby={titleId}
      onClick={(e) => handleDialogBackdropClickFallback(e, dialogRef.current)}
      {...({ closedby: 'any' } as Record<string, string>)}
    >
      {project && (
        <div className="dialog-surface">
          <div className="dialog-header">
            <div className="dialog-badges">
              <span className={`category-pill accent-${project.accentColor}`}>
                {project.categoryLabel}
              </span>
              <span className="meta-pill">{project.year}</span>
              <span className="meta-pill">{project.role}</span>
            </div>
            <button
              type="button"
              className="dialog-close-btn"
              onClick={() => void closeTopLayer(dialogRef.current)}
              aria-label={labels.closeAria}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="dialog-grid">
            <div className="dialog-visual-col">
              <ProjectVisual visualType={project.visualType} />
              <div className="dialog-tech-box">
                <h4 className="dialog-subhead">{labels.stackTitle}</h4>
                <div className="tech-tags-wrap">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="dialog-info-col">
              <h2 id={titleId} className="dialog-title">
                {project.title}
              </h2>
              <p className="dialog-subtitle">{project.subtitle}</p>
              <p className="dialog-description">{project.fullDescription}</p>

              <div className="dialog-architecture">
                <h4 className="dialog-subhead">{labels.architectureTitle}</h4>
                <ul className="architecture-list">
                  {project.architecturePoints.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
};

