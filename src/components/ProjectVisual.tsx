import React from 'react';
import { ProjectItem } from '../types';

interface ProjectVisualProps {
  visualType: ProjectItem['visualType'];
  compact?: boolean;
}

export const ProjectVisual: React.FC<ProjectVisualProps> = ({ visualType, compact = false }) => {
  switch (visualType) {
    case 'netsim':
      return (
        <div className={`project-visual visual-netsim ${compact ? 'is-compact' : ''}`}>
          <div className="visual-topbar">
            <span className="dot dot-red" />
            <span className="dot dot-amber" />
            <span className="dot dot-green" />
            <span className="visual-filename">topology_wan.gns3 · Yjs CRDT Sync</span>
            <span className="visual-live-pill">2 pairs en ligne</span>
          </div>
          <svg viewBox="0 0 360 190" className="visual-svg" aria-hidden="true">
            <defs>
              <linearGradient id="cyanLink" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00b4d8" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            {/* Grid background */}
            <pattern id="netsimGrid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(148,163,184,0.08)" strokeWidth="1" />
            </pattern>
            <rect width="360" height="190" fill="url(#netsimGrid)" />

            {/* Network links */}
            <line x1="80" y1="95" x2="180" y2="50" stroke="url(#cyanLink)" strokeWidth="2.5" strokeDasharray="5 3" />
            <line x1="80" y1="95" x2="180" y2="140" stroke="url(#cyanLink)" strokeWidth="2.5" />
            <line x1="180" y1="50" x2="285" y2="95" stroke="url(#cyanLink)" strokeWidth="2.5" />
            <line x1="180" y1="140" x2="285" y2="95" stroke="url(#cyanLink)" strokeWidth="2.5" />
            <line x1="180" y1="50" x2="180" y2="140" stroke="rgba(0,180,216,0.45)" strokeWidth="1.8" strokeDasharray="3 3" />

            {/* Core Router R1 */}
            <g transform="translate(80, 95)">
              <circle r="24" fill="#0d1b2a" stroke="#00b4d8" strokeWidth="2" />
              <text textAnchor="middle" dy="-2" fill="#e2e8f0" fontSize="10" fontWeight="700">R-CORE</text>
              <text textAnchor="middle" dy="10" fill="#00b4d8" fontSize="7.5">10.0.0.1</text>
            </g>

            {/* Switch SW1 */}
            <g transform="translate(180, 50)">
              <rect x="-26" y="-18" width="52" height="36" rx="8" fill="#0d1b2a" stroke="#38bdf8" strokeWidth="2" />
              <text textAnchor="middle" dy="-2" fill="#e2e8f0" fontSize="9.5" fontWeight="700">SW-DIST1</text>
              <text textAnchor="middle" dy="10" fill="#94a3b8" fontSize="7.5">VLAN 10/20</text>
            </g>

            {/* Switch SW2 */}
            <g transform="translate(180, 140)">
              <rect x="-26" y="-18" width="52" height="36" rx="8" fill="#0d1b2a" stroke="#818cf8" strokeWidth="2" />
              <text textAnchor="middle" dy="-2" fill="#e2e8f0" fontSize="9.5" fontWeight="700">SW-DIST2</text>
              <text textAnchor="middle" dy="10" fill="#94a3b8" fontSize="7.5">Failover</text>
            </g>

            {/* Edge Gateway */}
            <g transform="translate(285, 95)">
              <circle r="24" fill="#0d1b2a" stroke="#6366f1" strokeWidth="2" />
              <text textAnchor="middle" dy="-2" fill="#e2e8f0" fontSize="10" fontWeight="700">GW-EDGE</text>
              <text textAnchor="middle" dy="10" fill="#a5b4fc" fontSize="7.5">.gns3 ready</text>
            </g>

            {/* Collaborative cursor tag */}
            <g transform="translate(215, 24)">
              <rect x="0" y="0" width="64" height="18" rx="9" fill="#00b4d8" />
              <text x="32" y="12" textAnchor="middle" fill="#06101a" fontSize="8.5" fontWeight="700">Macky (Yjs)</text>
            </g>
          </svg>
        </div>
      );

    case 'sgn-compiler':
      return (
        <div className={`project-visual visual-compiler ${compact ? 'is-compact' : ''}`}>
          <div className="visual-topbar">
            <span className="dot dot-red" />
            <span className="dot dot-amber" />
            <span className="dot dot-green" />
            <span className="visual-filename">sgn_parser.y · Flex &amp; Bison</span>
            <span className="visual-live-pill pill-amber">AST Validé</span>
          </div>
          <div className="compiler-pipeline">
            <div className="compiler-code-box">
              <code>
                <span className="kw">etudiant</span> &quot;Macky&quot; {'{'}
                <br />
                &nbsp;&nbsp;<span className="ident">algo</span>: <span className="num">18.5</span> <span className="kw">coef</span> <span className="num">4</span>;
                <br />
                &nbsp;&nbsp;<span className="ident">reseau</span>: <span className="num">17.0</span> <span className="kw">coef</span> <span className="num">3</span>;
                <br />
                {'}'}
              </code>
            </div>
            <div className="compiler-stages">
              <div className="stage-chip">
                <span className="stage-step">01</span>
                <div>
                  <strong>Lexer Flex</strong>
                  <small>Tokens &amp; Règles</small>
                </div>
              </div>
              <div className="stage-chip">
                <span className="stage-step">02</span>
                <div>
                  <strong>Parser Bison</strong>
                  <small>Arbre AST en C</small>
                </div>
              </div>
              <div className="stage-chip">
                <span className="stage-step">03</span>
                <div>
                  <strong>Table Symboles</strong>
                  <small>Typage &amp; Moyennes</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'vpn-ipsec':
      return (
        <div className={`project-visual visual-vpn ${compact ? 'is-compact' : ''}`}>
          <div className="visual-topbar">
            <span className="dot dot-red" />
            <span className="dot dot-amber" />
            <span className="dot dot-green" />
            <span className="visual-filename">ipsec_hub_spoke.pkt · 72 Tunnels</span>
            <span className="visual-live-pill pill-indigo">Failover Actif</span>
          </div>
          <svg viewBox="0 0 360 190" className="visual-svg" aria-hidden="true">
            {/* Spokes around central hub */}
            {Array.from({ length: 12 }).map((_, idx) => {
              const angle = (idx * 30 * Math.PI) / 180;
              const cx = 180 + Math.cos(angle) * 74;
              const cy = 95 + Math.sin(angle) * 66;
              return (
                <g key={idx}>
                  <line
                    x1="180"
                    y1="95"
                    x2={cx}
                    y2={cy}
                    stroke={idx % 3 === 0 ? '#38bdf8' : '#818cf8'}
                    strokeWidth="1.6"
                    strokeOpacity="0.65"
                    strokeDasharray={idx % 2 === 0 ? 'none' : '3 2'}
                  />
                  <circle
                    cx={cx}
                    cy={cy}
                    r="11"
                    fill="#0f172a"
                    stroke={idx % 3 === 0 ? '#00b4d8' : '#6366f1'}
                    strokeWidth="1.6"
                  />
                  <text
                    x={cx}
                    y={cy + 3}
                    textAnchor="middle"
                    fill="#e2e8f0"
                    fontSize="6.8"
                    fontWeight="600"
                  >
                    S{idx + 1}
                  </text>
                </g>
              );
            })}
            {/* Central Hub */}
            <g transform="translate(180, 95)">
              <circle r="28" fill="#091526" stroke="#00b4d8" strokeWidth="2.5" />
              <text textAnchor="middle" dy="-3" fill="#ffffff" fontSize="9.5" fontWeight="800">
                HUB HQ
              </text>
              <text textAnchor="middle" dy="9" fill="#38bdf8" fontSize="7.2" fontWeight="600">
                IPsec IKEv2
              </text>
            </g>
          </svg>
        </div>
      );

    case 'ocr-pipeline':
      return (
        <div className={`project-visual visual-ocr ${compact ? 'is-compact' : ''}`}>
          <div className="visual-topbar">
            <span className="dot dot-red" />
            <span className="dot dot-amber" />
            <span className="dot dot-green" />
            <span className="visual-filename">cni_mrz_pipeline.rs · PyO3 / Maturin</span>
            <span className="visual-live-pill pill-emerald">Rust + AI</span>
          </div>
          <div className="ocr-flow-diagram">
            <div className="ocr-card-mock">
              <div className="ocr-card-header">CNI · SÉNÉGAL / CÔTE D’IVOIRE</div>
              <div className="ocr-card-lines">
                <span className="ocr-line short" />
                <span className="ocr-line medium" />
              </div>
              <div className="ocr-mrz-zone">
                <code>IDSN&lt;WONE&lt;&lt;MACKY&lt;MAMADOU&lt;&lt;&lt;&lt;&lt;&lt;</code>
              </div>
            </div>
            <div className="ocr-steps-row">
              <div className="ocr-node">
                <span className="ocr-node-tag">Vision</span>
                <strong>PaddleOCR</strong>
              </div>
              <span className="ocr-arrow">→</span>
              <div className="ocr-node node-rust">
                <span className="ocr-node-tag">PyO3 / Rust</span>
                <strong>MRZ Parser</strong>
              </div>
              <span className="ocr-arrow">→</span>
              <div className="ocr-node">
                <span className="ocr-node-tag">API &amp; UI</span>
                <strong>FastAPI / Streamlit</strong>
              </div>
            </div>
          </div>
        </div>
      );
  }
};

