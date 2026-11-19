import React, { useEffect, useId, useRef } from 'react';
import { closeTopLayer, handleDialogBackdropClickFallback } from '../utils/modernWeb';
import { PROFILE_DATA } from '../data/cvData';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      void closeTopLayer(dialog);
    }
  }, [isOpen]);

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
      className="modern-dialog cv-preview-dialog"
      aria-labelledby={titleId}
      onClick={(e) => handleDialogBackdropClickFallback(e, dialogRef.current)}
      {...({ closedby: 'any' } as Record<string, string>)}
    >
      <div className="dialog-surface cv-dialog-surface">
        <div className="dialog-header cv-dialog-header">
          <div>
            <h2 id={titleId} className="dialog-title cv-modal-title">
              Curriculum Vitae — {PROFILE_DATA.fullName}
            </h2>
            <p className="cv-modal-sub">
              {PROFILE_DATA.subtitle}
            </p>
          </div>
          <div className="cv-header-actions">
            <a
              href={PROFILE_DATA.cvPdfUrl}
              download="CV_Macky_Mamadou_Wone.pdf"
              className="btn btn-primary btn-sm"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Télécharger le PDF</span>
            </a>
            <button
              type="button"
              className="dialog-close-btn"
              onClick={() => void closeTopLayer(dialogRef.current)}
              aria-label="Fermer l'aperçu du CV"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
        <div className="cv-iframe-container">
          {isOpen && (
            <iframe
              src={PROFILE_DATA.cvPdfUrl}
              title={`CV de ${PROFILE_DATA.fullName}`}
              className="cv-iframe"
            />
          )}
        </div>
      </div>
    </dialog>
  );
};

