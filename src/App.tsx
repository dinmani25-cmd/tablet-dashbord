import { useMemo, useState, type CSSProperties } from 'react';
import './App.css';

type Signal = {
  label: string;
  value: string;
  status: 'stable' | 'watch' | 'critical';
};

type Mission = {
  name: string;
  region: string;
  progress: number;
  owner: string;
};

const signals: Signal[] = [
  { label: 'Core Sync', value: '98.7%', status: 'stable' },
  { label: 'Threat Grid', value: '12', status: 'watch' },
  { label: 'Uplink', value: '8.4Gb/s', status: 'stable' },
  { label: 'Containment', value: '03', status: 'critical' }
];

const missions: Mission[] = [
  { name: 'Obsidian Relay', region: 'North Atlantic', progress: 78, owner: 'Ops Alpha' },
  { name: 'Neon Perimeter', region: 'Sector 7', progress: 44, owner: 'Sentinel' },
  { name: 'Aurora Watch', region: 'Low Orbit', progress: 91, owner: 'Skyline' }
];

const telemetry = [64, 72, 58, 82, 69, 88, 76, 94, 83, 97, 89, 100];

function statusText(status: Signal['status']) {
  return status === 'stable' ? 'Nominal' : status === 'watch' ? 'Watch' : 'Priority';
}

function OrbitalMap() {
  return (
    <section className="orbital-map panel" aria-label="Mission topology">
      <div className="map-grid" />
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="core-node">
        <span>D.E.V.I.L</span>
      </div>
      <span className="satellite sat-one" />
      <span className="satellite sat-two" />
      <span className="satellite sat-three" />
      <div className="map-readout">
        <strong>Live Theatre</strong>
        <span>Digital Environment Visualization & Intelligent Launcher</span>
      </div>
    </section>
  );
}

function TelemetryGraph() {
  return (
    <section className="panel telemetry-panel" aria-label="Telemetry trend">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">Telemetry</span>
          <h2>Neural Load</h2>
        </div>
        <span className="pulse-pill">Live</span>
      </div>
      <div className="bars">
        {telemetry.map((value, index) => (
          <span key={index} style={{ '--bar-height': `${value}%` } as CSSProperties} />
        ))}
      </div>
    </section>
  );
}

function MissionCard({ mission }: { mission: Mission }) {
  return (
    <article className="mission-card">
      <div>
        <h3>{mission.name}</h3>
        <span>{mission.region}</span>
      </div>
      <div className="progress-track" aria-label={`${mission.progress}% complete`}>
        <span style={{ width: `${mission.progress}%` }} />
      </div>
      <footer>
        <span>{mission.owner}</span>
        <strong>{mission.progress}%</strong>
      </footer>
    </article>
  );
}

export function App() {
  const [mode, setMode] = useState<'command' | 'stealth' | 'analysis'>('command');
  const timestamp = useMemo(
    () =>
      new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        weekday: 'short',
        month: 'short',
        day: '2-digit'
      }).format(new Date()),
    []
  );

  return (
    <main className={`shell mode-${mode}`}>
      <header className="topbar">
        <a className="brand" href="#overview" aria-label="D.E.V.I.L Mission Control home">
          <span className="brand-mark">D</span>
          <span>
            <strong>D.E.V.I.L</strong>
            <small>Mission Control</small>
          </span>
        </a>
        <nav className="mode-switch" aria-label="Operating mode">
          {(['command', 'stealth', 'analysis'] as const).map((option) => (
            <button
              key={option}
              className={mode === option ? 'active' : ''}
              type="button"
              onClick={() => setMode(option)}
            >
              {option}
            </button>
          ))}
        </nav>
        <div className="clock" aria-label="System time">
          {timestamp}
        </div>
      </header>

      <section className="hero" id="overview">
        <div className="hero-copy">
          <span className="eyebrow">Digital Environment Visualization & Intelligent Launcher</span>
          <h1>D.E.V.I.L Mission Control</h1>
          <p>
            A tablet-first command surface for monitoring live systems, launching missions, and keeping
            the operational picture beautifully sharp.
          </p>
        </div>
        <div className="hero-actions" aria-label="Mission actions">
          <button type="button">Launch Protocol</button>
          <button type="button" className="ghost">
            Run Diagnostics
          </button>
        </div>
      </section>

      <section className="signal-grid" aria-label="System signals">
        {signals.map((signal) => (
          <article className={`signal-card ${signal.status}`} key={signal.label}>
            <span>{signal.label}</span>
            <strong>{signal.value}</strong>
            <small>{statusText(signal.status)}</small>
          </article>
        ))}
      </section>

      <section className="dashboard">
        <OrbitalMap />
        <div className="stack">
          <TelemetryGraph />
          <section className="panel missions-panel" aria-label="Active missions">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">Operations</span>
                <h2>Active Missions</h2>
              </div>
              <span className="mission-count">03</span>
            </div>
            <div className="mission-list">
              {missions.map((mission) => (
                <MissionCard mission={mission} key={mission.name} />
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
