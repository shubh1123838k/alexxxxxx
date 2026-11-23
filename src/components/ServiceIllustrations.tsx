import React, { useId } from 'react';

const PALETTE = {
  blue: '#7FB2F0',
  blueSoft: '#E6F0FC',
  coral: '#F4876E',
  coralSoft: '#FDE7E1',
  yellow: '#F7C548',
  yellowSoft: '#FEF4D6',
  mint: '#6FD3AE',
  mintSoft: '#DFF6EE',
  ink: '#2F2F2F',
  line: '#D9D9D9',
  soft: '#F4F4F4',
  white: '#FFFFFF',
};

function IllustrationFrame({ title, children }: { title: string; children: React.ReactNode }) {
  const titleId = useId();
  return (
    <svg viewBox="0 0 320 220" width="100%" role="img" aria-labelledby={titleId} style={{ display: 'block' }}>
      <title id={titleId}>{title}</title>
      <rect width="320" height="220" fill="#fff" />
      {children}
    </svg>
  );
}

export function FullStackIllustration() {
  return (
    <IllustrationFrame title="Illustration of a full stack web app connected to a server and a database">
      <path d="M224 78 H238 V58 H252" fill="none" stroke={PALETTE.ink} strokeWidth="1.5" strokeDasharray="4 3" />
      <path d="M276 84 V128" fill="none" stroke={PALETTE.ink} strokeWidth="1.5" strokeDasharray="4 3" />
      <rect x="12" y="14" width="212" height="192" rx="10" fill={PALETTE.white} stroke={PALETTE.line} strokeWidth="1.5" />
      <path d="M12 24 a10 10 0 0 1 10 -10 h192 a10 10 0 0 1 10 10 v10 h-212 z" fill={PALETTE.soft} />
      <circle cx="24" cy="24" r="3.5" fill={PALETTE.coral} />
      <circle cx="35" cy="24" r="3.5" fill={PALETTE.yellow} />
      <circle cx="46" cy="24" r="3.5" fill={PALETTE.mint} />
      <rect x="64" y="19" width="140" height="10" rx="5" fill={PALETTE.white} stroke={PALETTE.line} />
      <rect x="20" y="42" width="40" height="156" rx="6" fill={PALETTE.blueSoft} />
      {[54, 68, 82, 96].map((y, idx) => (
        <rect
          key={y}
          x="27"
          y={y}
          width={idx === 0 ? 26 : 20}
          height="6"
          rx="3"
          fill={idx === 0 ? PALETTE.blue : '#BFD6F3'}
        />
      ))}
      {(
        [
          [44, PALETTE.coral],
          [66, PALETTE.yellow],
          [88, PALETTE.mint],
        ] as const
      ).map(([y, fill]) => (
        <g key={y}>
          <rect x="70" y={y} width="144" height="16" rx="4" fill={PALETTE.white} stroke={PALETTE.line} />
          <circle cx="80" cy={y + 8} r="4" fill={fill} />
          <rect x="90" y={y + 5.5} width="70" height="5" rx="2.5" fill={PALETTE.line} />
        </g>
      ))}
      <rect x="70" y="116" width="144" height="82" rx="6" fill={PALETTE.soft} />
      <rect x="78" y="126" width="128" height="14" rx="4" fill={PALETTE.white} stroke={PALETTE.line} />
      <rect x="78" y="148" width="128" height="14" rx="4" fill={PALETTE.white} stroke={PALETTE.line} />
      <rect x="78" y="172" width="56" height="16" rx="8" fill={PALETTE.blue} />
      <rect x="88" y="178" width="36" height="4" rx="2" fill={PALETTE.white} />
      <rect x="252" y="36" width="48" height="48" rx="7" fill={PALETTE.white} stroke={PALETTE.ink} strokeWidth="1.5" />
      <rect x="259" y="44" width="34" height="12" rx="3" fill={PALETTE.coralSoft} stroke={PALETTE.coral} />
      <rect x="259" y="62" width="34" height="12" rx="3" fill={PALETTE.coralSoft} stroke={PALETTE.coral} />
      <circle cx="286" cy="50" r="2" fill={PALETTE.mint} />
      <circle cx="286" cy="68" r="2" fill={PALETTE.mint} />
      <text x="276" y="98" textAnchor="middle" fontSize="9" fontWeight="600" fill={PALETTE.ink}>
        server
      </text>
      <path d="M254 136 v34 a22 7 0 0 0 44 0 v-34" fill={PALETTE.yellowSoft} stroke={PALETTE.ink} strokeWidth="1.5" />
      <ellipse cx="276" cy="136" rx="22" ry="7" fill={PALETTE.yellow} stroke={PALETTE.ink} strokeWidth="1.5" />
      <path d="M254 153 a22 7 0 0 0 44 0" fill="none" stroke={PALETTE.ink} strokeWidth="1" />
      <text x="276" y="196" textAnchor="middle" fontSize="9" fontWeight="600" fill={PALETTE.ink}>
        database
      </text>
    </IllustrationFrame>
  );
}

export function AiSearchIllustration() {
  const cards = [
    { x: 16, fill: PALETTE.blue, soft: PALETTE.blueSoft },
    { x: 117, fill: PALETTE.coral, soft: PALETTE.coralSoft },
    { x: 218, fill: PALETTE.mint, soft: PALETTE.mintSoft },
  ];
  return (
    <IllustrationFrame title="Illustration of AI search finding results from a natural-language query, with an API fallback">
      <rect x="16" y="14" width="288" height="36" rx="18" fill={PALETTE.white} stroke={PALETTE.ink} strokeWidth="1.5" />
      <circle cx="37" cy="30" r="6" fill="none" stroke={PALETTE.ink} strokeWidth="1.8" />
      <path d="M41.5 34.5 L46 39" stroke={PALETTE.ink} strokeWidth="1.8" strokeLinecap="round" />
      <text x="54" y="36" fontSize="12" fontWeight="500" fill={PALETTE.ink}>
        that reel with the pasta recipe
      </text>
      <rect x="235" y="25" width="1.5" height="14" fill={PALETTE.ink} />
      <rect x="258" y="22" width="36" height="16" rx="8" fill={PALETTE.yellow} />
      <text x="276" y="33.5" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PALETTE.ink}>
        AI
      </text>
      {cards.map(({ x, fill, soft }, idx) => (
        <g key={x}>
          <rect
            x={x}
            y="64"
            width="86"
            height="104"
            rx="8"
            fill={soft}
            stroke={idx === 0 ? PALETTE.ink : 'none'}
            strokeWidth="1.5"
          />
          <rect x={x + 7} y="71" width="72" height="54" rx="5" fill={fill} />
          <path d={`M${x + 38} 88 l12 10 l-12 10 z`} fill={PALETTE.white} />
          <rect x={x + 7} y="134" width="58" height="6" rx="3" fill={PALETTE.ink} opacity="0.75" />
          <rect x={x + 7} y="146" width="40" height="5" rx="2.5" fill={PALETTE.line} />
          <text x={x + 79} y="160" textAnchor="end" fontSize="8" fontWeight="700" fill={PALETTE.ink} opacity="0.6">
            {['98%', '91%', '84%'][idx]}
          </text>
        </g>
      ))}
      <rect x="16" y="180" width="196" height="26" rx="13" fill={PALETTE.white} stroke={PALETTE.line} strokeWidth="1.5" />
      <text x="28" y="197" fontSize="9.5" fontWeight="700" fill={PALETTE.ink}>
        fallback
      </text>
      <rect x="74" y="186" width="44" height="14" rx="7" fill={PALETTE.soft} />
      <text
        x="96"
        y="196"
        textAnchor="middle"
        fontSize="8.5"
        fontWeight="600"
        fill="#9A9A9A"
        textDecoration="line-through"
      >
        key 1
      </text>
      <path
        d="M124 193 h14 m-4 -4 l4 4 l-4 4"
        fill="none"
        stroke={PALETTE.ink}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="144" y="186" width="58" height="14" rx="7" fill={PALETTE.mint} />
      <text x="173" y="196" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PALETTE.ink}>
        key 2 ✓
      </text>
    </IllustrationFrame>
  );
}

function PhoneFrame({ x, children }: { x: number; children: React.ReactNode }) {
  return (
    <g>
      <rect x={x} y="10" width="100" height="200" rx="18" fill={PALETTE.ink} />
      <rect x={x + 5} y="15" width="90" height="190" rx="14" fill={PALETTE.white} />
      <rect x={x + 36} y="20" width="28" height="7" rx="3.5" fill={PALETTE.ink} />
      {children}
    </g>
  );
}

export function MobileAppsIllustration() {
  return (
    <IllustrationFrame title="Illustration of a cross-platform mobile app with a chat screen and a list screen">
      <PhoneFrame x={52}>
        <rect x="57" y="32" width="90" height="20" fill={PALETTE.blueSoft} />
        <circle cx="70" cy="42" r="6" fill={PALETTE.blue} />
        <rect x="80" y="39" width="36" height="6" rx="3" fill={PALETTE.ink} opacity="0.7" />
        <rect x="64" y="62" width="52" height="18" rx="9" fill={PALETTE.soft} />
        <rect x="88" y="86" width="52" height="18" rx="9" fill={PALETTE.blue} />
        <rect x="64" y="110" width="62" height="26" rx="10" fill={PALETTE.soft} />
        <rect x="96" y="142" width="44" height="18" rx="9" fill={PALETTE.blue} />
        <rect x="63" y="176" width="64" height="18" rx="9" fill={PALETTE.white} stroke={PALETTE.line} />
        <circle cx="136" cy="185" r="8" fill={PALETTE.coral} />
        <path
          d="M133 185 h6 m-2.5 -2.5 l2.5 2.5 l-2.5 2.5"
          stroke={PALETTE.white}
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
        />
      </PhoneFrame>
      <PhoneFrame x={168}>
        <rect x="173" y="32" width="90" height="26" fill={PALETTE.coral} />
        <rect x="181" y="42" width="44" height="7" rx="3.5" fill={PALETTE.white} />
        {(
          [
            [68, PALETTE.yellow],
            [98, PALETTE.mint],
            [128, PALETTE.blue],
            [158, PALETTE.coral],
          ] as const
        ).map(([y, fill]) => (
          <g key={y}>
            <rect x="179" y={y} width="78" height="24" rx="6" fill={PALETTE.white} stroke={PALETTE.line} />
            <circle cx="191" cy={y + 12} r="7" fill={fill} />
            <rect x="203" y={y + 6} width="40" height="5" rx="2.5" fill={PALETTE.ink} opacity="0.7" />
            <rect x="203" y={y + 14} width="26" height="4" rx="2" fill={PALETTE.line} />
          </g>
        ))}
        <rect x="202" y="194" width="32" height="3" rx="1.5" fill={PALETTE.ink} opacity="0.4" />
      </PhoneFrame>
    </IllustrationFrame>
  );
}

const CODE_LINES: Array<Array<{ t: string; k?: 'kw' | 'fn' | 'type' }>> = [
  [{ t: 'vector', k: 'type' }, { t: '<int> adj[N];' }],
  [{ t: 'void', k: 'kw' }, { t: ' ' }, { t: 'dfs', k: 'fn' }, { t: '(int u) {' }],
  [{ t: '  seen[u] = ' }, { t: 'true', k: 'kw' }, { t: ';' }],
  [{ t: '  for', k: 'kw' }, { t: ' (int v : adj[u])' }],
  [{ t: '    if', k: 'kw' }, { t: ' (!seen[v]) ' }, { t: 'dfs', k: 'fn' }, { t: '(v);' }],
  [{ t: '}' }],
];

const SYNTAX_COLORS: Record<string, string> = {
  kw: '#3B7DD8',
  fn: '#D9603F',
  type: '#2E9C76',
};

const GRAPH_NODES: Array<[number, number, string]> = [
  [234, 58, PALETTE.blue],
  [288, 50, PALETTE.coral],
  [262, 108, PALETTE.yellow],
  [226, 160, PALETTE.mint],
  [290, 164, PALETTE.blue],
];

const GRAPH_EDGES: Array<[number, number]> = [
  [0, 1],
  [0, 2],
  [1, 2],
  [2, 3],
  [2, 4],
  [3, 4],
];

export function ProblemSolvingIllustration() {
  return (
    <IllustrationFrame title="Illustration of a C++ depth-first search next to a graph of connected nodes">
      <rect x="12" y="14" width="186" height="192" rx="10" fill={PALETTE.white} stroke={PALETTE.line} strokeWidth="1.5" />
      <path d="M12 24 a10 10 0 0 1 10 -10 h166 a10 10 0 0 1 10 10 v10 h-186 z" fill={PALETTE.soft} />
      <circle cx="24" cy="24" r="3.5" fill={PALETTE.coral} />
      <circle cx="35" cy="24" r="3.5" fill={PALETTE.yellow} />
      <circle cx="46" cy="24" r="3.5" fill={PALETTE.mint} />
      <text x="105" y="27" textAnchor="middle" fontSize="8.5" fontWeight="600" fill={PALETTE.ink} opacity="0.6">
        dfs.cpp
      </text>
      <rect x="13" y="82" width="184" height="16" fill={PALETTE.yellowSoft} />
      <g fontFamily="ui-monospace, Consolas, 'Courier New', monospace" fontSize="9.5">
        {CODE_LINES.map((tokens, lineIdx) => (
          <g key={lineIdx}>
            <text x="22" y={52 + lineIdx * 18} fill="#B0B0B0">
              {lineIdx + 1}
            </text>
            <text x="36" y={52 + lineIdx * 18} fill={PALETTE.ink} xmlSpace="preserve">
              {tokens.map((tok, tokIdx) => (
                <tspan
                  key={tokIdx}
                  fill={tok.k ? SYNTAX_COLORS[tok.k] : PALETTE.ink}
                  fontWeight={tok.k ? 700 : 400}
                >
                  {tok.t}
                </tspan>
              ))}
            </text>
          </g>
        ))}
      </g>
      <rect x="22" y="168" width="64" height="16" rx="8" fill={PALETTE.mintSoft} />
      <text x="54" y="179" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#2E9C76">
        ✓ Accepted
      </text>
      {GRAPH_EDGES.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={GRAPH_NODES[a][0]}
          y1={GRAPH_NODES[a][1]}
          x2={GRAPH_NODES[b][0]}
          y2={GRAPH_NODES[b][1]}
          stroke={PALETTE.ink}
          strokeWidth="1.5"
          opacity="0.55"
        />
      ))}
      {GRAPH_NODES.map(([cx, cy, fill], idx) => (
        <g key={idx}>
          <circle cx={cx} cy={cy} r="13" fill={fill} stroke={PALETTE.ink} strokeWidth="1.5" />
          <text x={cx} y={cy + 3.5} textAnchor="middle" fontSize="10" fontWeight="800" fill={PALETTE.ink}>
            {idx + 1}
          </text>
        </g>
      ))}
    </IllustrationFrame>
  );
}

export const SERVICE_ILLUSTRATIONS = {
  fullstack: FullStackIllustration,
  ai: AiSearchIllustration,
  mobile: MobileAppsIllustration,
  'problem-solving': ProblemSolvingIllustration,
};
