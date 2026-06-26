import { useMemo, type CSSProperties } from 'react';
import './App.css';

type Gauge = {
  label: string;
  value: number;
  detail: string;
  tone: 'cyan' | 'green' | 'amber' | 'violet';
};

type Task = {
  title: string;
  meta: string;
  done: boolean;
};

const navItems = ['Home', 'Weather', 'Calendar', 'Photos', 'Notes', 'Tasks', 'Music', 'Links'];

const gauges: Gauge[] = [
  { label: 'Core Sync', value: 92, detail: '12 modules online', tone: 'cyan' },
  { label: 'Energy', value: 76, detail: 'Tablet dock stable', tone: 'green' },
  { label: 'Focus', value: 64, detail: '3 priority threads', tone: 'amber' },
  { label: 'Signal', value: 88, detail: 'Encrypted uplink', tone: 'violet' }
];

const calendarDays = [
  { day: 'Mon', date: '22' },
  { day: 'Tue', date: '23' },
  { day: 'Wed', date: '24' },
  { day: 'Thu', date: '25' },
  { day: 'Fri', date: '26', active: true },
  { day: 'Sat', date: '27' },
  { day: 'Sun', date: '28' }
];

const tasks: Task[] = [
  { title: 'Calibrate weather feed', meta: '08:40 command sweep', done: true },
  { title: 'Review photo capture queue', meta: '12 assets waiting', done: false },
  { title: 'Publish Pages deployment', meta: 'GitHub Actions source', done: false },
  { title: 'Archive mission notes', meta: 'Notebook alpha', done: false }
];

const quickLinks = ['Launch', 'Files', 'Maps', 'Studio', 'Vault', 'Control'];
const photos = ['Aperture', 'Night Grid', 'Command Lens'];

function GaugeCard({ gauge }: { gauge: Gauge }) {
  return (
    <article className={`glass-card gauge-card ${gauge.tone}`}>
      <div
        className="gauge-ring"
        style={{ '--value': `${gauge.value * 3.6}deg` } as CSSProperties}
        aria-label={`${gauge.label} ${gauge.value}%`}
      >
        <span>{gauge.value}%</span>
      </div>
      <div>
        <h3>{gauge.label}</h3>
        <p>{gauge.detail}</p>
      </div>
    </article>
  );
}

function WeatherPanel() {
  return (
    <section className="glass-card weather-panel" aria-labelledby="weather-title">
      <div className="card-title-row">
        <div>
          <span className="eyebrow">Atmosphere</span>
          <h2 id="weather-title">Weather</h2>
        </div>
        <span className="status-chip">Live</span>
      </div>
      <div className="weather-core">
        <div className="weather-orb" />
        <div>
          <strong>28 C</strong>
          <span>Haze with clean signal</span>
        </div>
      </div>
      <div className="weather-stats">
        <span>Wind 11 km/h</span>
        <span>Humidity 62%</span>
        <span>UV 4.2</span>
      </div>
    </section>
  );
}

function CalendarPanel() {
  return (
    <section className="glass-card calendar-panel" aria-labelledby="calendar-title">
      <div className="card-title-row">
        <div>
          <span className="eyebrow">Schedule</span>
          <h2 id="calendar-title">Calendar</h2>
        </div>
        <span className="status-chip muted">June</span>
      </div>
      <div className="day-strip">
        {calendarDays.map((item) => (
          <span className={item.active ? 'active' : ''} key={item.date}>
            <small>{item.day}</small>
            <strong>{item.date}</strong>
          </span>
        ))}
      </div>
      <div className="event-card">
        <span>19:30</span>
        <strong>Mission Control Sync</strong>
      </div>
    </section>
  );
}

function PhotographyHub() {
  return (
    <section className="glass-card photo-panel" aria-labelledby="photo-title">
      <div className="card-title-row">
        <div>
          <span className="eyebrow">Creative</span>
          <h2 id="photo-title">Photography Hub</h2>
        </div>
        <button type="button">Import</button>
      </div>
      <div className="photo-grid">
        {photos.map((photo, index) => (
          <article key={photo} className={`photo-tile tile-${index + 1}`}>
            <span>{photo}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function NotesPanel() {
  return (
    <section className="glass-card notes-panel" aria-labelledby="notes-title">
      <div className="card-title-row">
        <div>
          <span className="eyebrow">Memory</span>
          <h2 id="notes-title">Notes</h2>
        </div>
        <span className="status-chip muted">4 pins</span>
      </div>
      <p>
        Keep D.E.V.I.L in command mode: review telemetry, ship the dashboard, then verify Pages.
      </p>
      <div className="note-tags">
        <span>Design</span>
        <span>PWA</span>
        <span>Deploy</span>
      </div>
    </section>
  );
}

function TodoPanel() {
  return (
    <section className="glass-card todo-panel" aria-labelledby="todo-title">
      <div className="card-title-row">
        <div>
          <span className="eyebrow">Execution</span>
          <h2 id="todo-title">To-Do List</h2>
        </div>
        <span className="status-chip">3 open</span>
      </div>
      <div className="task-list">
        {tasks.map((task) => (
          <label className="task-item" key={task.title}>
            <input type="checkbox" checked={task.done} readOnly />
            <span>
              <strong>{task.title}</strong>
              <small>{task.meta}</small>
            </span>
          </label>
        ))}
      </div>
    </section>
  );
}

function MusicPlayer() {
  return (
    <section className="glass-card music-panel" aria-labelledby="music-title">
      <div className="album-art">
        <span />
      </div>
      <div className="track-copy">
        <span className="eyebrow">Now Playing</span>
        <h2 id="music-title">Synthetic Horizon</h2>
        <p>Mission Control Mix</p>
      </div>
      <div className="player-controls" aria-label="Music controls">
        <button type="button">Prev</button>
        <button type="button" className="primary-control">Play</button>
        <button type="button">Next</button>
      </div>
      <div className="track-progress"><span /></div>
    </section>
  );
}

function QuickLinks() {
  return (
    <section className="glass-card links-panel" aria-labelledby="links-title">
      <div className="card-title-row">
        <div>
          <span className="eyebrow">Launcher</span>
          <h2 id="links-title">Quick Links</h2>
        </div>
      </div>
      <div className="quick-grid">
        {quickLinks.map((link) => (
          <button type="button" key={link}>{link}</button>
        ))}
      </div>
    </section>
  );
}

export function App() {
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
    <main className="tablet-shell">
      <aside className="nav-rail" aria-label="D.E.V.I.L navigation">
        <a className="rail-brand" href="#overview" aria-label="D.E.V.I.L Mission Control home">D</a>
        <nav>
          {navItems.map((item) => (
            <a className={item === 'Home' ? 'active' : ''} href={`#${item.toLowerCase()}`} key={item}>
              <span>{item.slice(0, 2)}</span>
              <small>{item}</small>
            </a>
          ))}
        </nav>
      </aside>

      <section className="mission-surface" id="overview">
        <header className="command-header glass-card">
          <div>
            <span className="eyebrow">Digital Environment Visualization & Intelligent Launcher</span>
            <h1>D.E.V.I.L Mission Control</h1>
          </div>
          <div className="header-meta">
            <span>{timestamp}</span>
            <button type="button">Command Mode</button>
          </div>
        </header>

        <section className="gauge-grid" aria-label="Mission gauges">
          {gauges.map((gauge) => (
            <GaugeCard gauge={gauge} key={gauge.label} />
          ))}
        </section>

        <section className="dashboard-grid">
          <WeatherPanel />
          <CalendarPanel />
          <PhotographyHub />
          <NotesPanel />
          <TodoPanel />
          <MusicPlayer />
          <QuickLinks />
        </section>
      </section>
    </main>
  );
}
