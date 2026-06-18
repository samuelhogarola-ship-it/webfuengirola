import { useEffect } from "react";

export type LegalPanelKey = "about" | "legal" | "privacy" | "terms";

const legalPanels: Record<LegalPanelKey, { title: string; body: string }> = {
  about: {
    title: "About",
    body: "Madame Bleue | Monaco is a private pre-owned timepieces dealer based in Monaco, focused on curated references, discreet collector enquiries and appointment-led sourcing.",
  },
  legal: {
    title: "Legal Notice",
    body: "This website presents selected pre-owned timepiece references for private enquiry. Brand names are used solely to identify and describe the watches shown. Madame Bleue is an independent dealer and is not affiliated with, endorsed by or formally connected to the brands referenced unless explicitly stated.",
  },
  privacy: {
    title: "Privacy",
    body: "Enquiries are handled directly through the contact channels provided. Do not send sensitive personal information unless required for a private transaction or appointment. Any personal information shared by email or WhatsApp should be used only to respond to the enquiry.",
  },
  terms: {
    title: "Terms",
    body: "Information, availability, condition, documentation and pricing are provided by private conversation and may change without notice. Images and descriptions are provided for presentation purposes and do not constitute a binding offer or public purchase flow.",
  },
};

type LegalDialogProps = {
  activePanel: LegalPanelKey | null;
  onClose: () => void;
};

export function LegalDialog({ activePanel, onClose }: LegalDialogProps) {
  useEffect(() => {
    if (!activePanel) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePanel, onClose]);

  if (!activePanel) {
    return null;
  }

  const panel = legalPanels[activePanel];

  return (
    <div className="legal-backdrop" role="dialog" aria-modal="true" aria-labelledby="legal-title">
      <button type="button" className="legal-scrim" aria-label="Close legal panel" onClick={onClose} />
      <div className="legal-panel">
        <div className="legal-panel-header">
          <p className="section-label">Madame Bleue</p>
          <button type="button" className="viewer-close" onClick={onClose} aria-label="Close legal panel">
            Close
          </button>
        </div>
        <h2 id="legal-title">{panel.title}</h2>
        <p>{panel.body}</p>
      </div>
    </div>
  );
}
