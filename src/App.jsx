import { useEffect, useState } from 'react';
import { certificates, links, projects, skillGroups } from './data';

const symbols = { arrow: '↗', github: '◖◗', linkedin: 'in', menu: '☰', moon: '◐', sun: '☀', code: '</>', close: '×' };
const Icon = ({ name }) => <span aria-hidden="true" className={`icon icon-${name}`}>{symbols[name]}</span>;
const External = ({ href, children, className = '' }) => <a className={className} href={href} target="_blank" rel="noreferrer">{children}<Icon name="arrow" /></a>;

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);
  const visibleProjects = filter === 'All' ? projects : projects.filter((project) => project.category === filter);
  const nav = ['About', 'Skills', 'Projects', 'Experience', 'Achievements', 'Contact'];

  return <>
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Home">MCS<span>.</span></a>
      <nav className={menuOpen ? 'open' : ''}>{nav.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}</nav>
      <div className="header-actions">
        <button className="theme-button" aria-label="Toggle colour theme" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}><Icon name={theme === 'dark' ? 'sun' : 'moon'} /></button>
        <button className="menu-button" aria-label="Open navigation" onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? 'close' : 'menu'} /></button>
      </div>
    </header>
    <main id="top">
      <section className="hero section">
        <div className="hero-copy">
          <p className="eyebrow"><span className="pulse" /> Open to full-time opportunities</p>
          <h1>Building useful software,<br /><em>from idea to deployment.</em></h1>
          <p className="lede">I’m <strong>Moinuddin Chisty Shaik</strong>, a Full Stack Developer who combines Python, Flask and React with an engineering mindset to build practical products.</p>
          <div className="actions"><a className="button primary" href="#projects">View selected work <Icon name="arrow" /></a><a className="button secondary" href={links.resume} download>Resume</a></div>
          <div className="socials"><External href={links.github}><Icon name="github" /> GitHub</External><External href={links.linkedin}><Icon name="linkedin" /> LinkedIn</External></div>
        </div>
        <div className="hero-art" aria-label="Portrait of Moinuddin Chisty Shaik"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="portrait-frame"><img src="/profile1.png" alt="Moinuddin Chisty Shaik in a navy suit" /></div><div className="hero-stamp"><Icon name="code" /><span>ECE →<br />Software</span></div></div>
      </section>

      <section id="about" className="section split-section reveal"><p className="section-kicker">01 / ABOUT</p><div><h2>An engineer’s approach<br />to <em>software products.</em></h2><p className="body-copy">I am an IIITDM Kurnool ECE graduate who deliberately transitioned into full-stack engineering. My foundation in embedded systems, AI/ML and connected devices gives me a broader view of how real products work - while my focus is building reliable web applications and backend systems.</p><p className="body-copy">After completing Python Full Stack Development training at Codegnan, I now bring practical experience with Flask, React, SQL, REST APIs and deployable software workflows.</p><div className="mini-stats"><div><strong>8+</strong><span>Projects built</span></div><div><strong>3</strong><span>Technical programs</span></div><div><strong>520 kg</strong><span>Powerlifting total</span></div></div></div></section>

      <section id="skills" className="section reveal"><p className="section-kicker">02 / CAPABILITIES</p><h2>Technical range, <em>product focus.</em></h2><div className="skills-grid">{skillGroups.map(([group, skills], index) => <article className="skill-card" key={group}><span className="number">0{index + 1}</span><h3>{group}</h3><div>{skills.map((skill) => <span className="tag" key={skill}>{skill}</span>)}</div></article>)}</div></section>

      <section id="projects" className="section reveal"><div className="section-heading"><div><p className="section-kicker">03 / SELECTED WORK</p><h2>Things I’ve <em>built.</em></h2></div><div className="filters">{['All', 'Web', 'AI/ML', 'IoT'].map((item) => <button className={filter === item ? 'active' : ''} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div></div><div className="project-grid">{visibleProjects.map((project, index) => <a className="project-card" href={project.destination} target="_blank" rel="noreferrer" key={project.title} aria-label={`${project.destinationLabel}: ${project.title}`}><div className={`project-visual ${project.accent}`}><span>{String(index + 1).padStart(2, '0')}</span><div className="project-mark">{project.category === 'Web' ? '</>' : project.category === 'IoT' ? '◉' : '✦'}</div></div><div className="project-content"><p className="project-type">{project.type}</p><h3>{project.title}</h3><p>{project.description}</p><ul>{project.features.slice(0, 3).map((feature) => <li key={feature}>{feature}</li>)}</ul><div className="project-footer"><div className="stack">{project.stack.slice(0, 3).map((item) => <span key={item}>{item}</span>)}</div><span className="open-project">{project.destinationLabel} <Icon name="arrow" /></span></div></div></a>)}</div></section>

      <section id="experience" className="section reveal"><p className="section-kicker">04 / EXPERIENCE</p><h2>Learning by <em>shipping.</em></h2><div className="timeline"><Timeline date="Dec 2025 - May 2026" title="Python Full Stack Development" company="Codegnan IT Solutions" text="Practical specialization in Python, SQL, React, Flask, REST APIs, Git and database-driven applications." active /><Timeline date="Jan 2025 - Mar 2025" title="IoT Research Intern" company="Samsung Innovation Campus" text="Developed and tested backend modules for real-time IoT sensor data processing, storage and monitoring workflows." /><Timeline date="Sep 2024 - Dec 2024" title="Machine Learning Intern" company="Infosys Springboard" text="Built Python workflows for data processing, validation and breast cancer classification with AdaBoost." /></div></section>

      <section id="achievements" className="section achievements reveal"><p className="section-kicker">05 / ACHIEVEMENTS</p><h2>Discipline is a <em>practice.</em></h2><div className="achievement-grid"><article className="lift-card"><p>COMPETITIVE POWERLIFTING</p><strong>520<span>kg</span></strong><h3>Current three-lift total</h3><div className="lift-breakdown"><span>Squat <b>180 kg</b></span><span>Bench <b>115 kg</b></span><span>Deadlift <b>225 kg</b></span></div><div className="medals"><span>4× Gold · Inter-department</span><span>Silver · Inter-IIIT 2025</span><span>Bronze · Inter-IIIT 2023</span></div></article><article className="achievement-card"><span>GATE</span><strong>393</strong><p>Qualified GATE (DA)</p></article><article className="achievement-card"><span>ATHLETICS</span><strong>11.53<small>s</small></strong><p>100m personal best</p></article><article className="achievement-card"><span>FOOTBALL</span><strong>3</strong><p>Gold medals</p></article></div></section>

      <section id="education" className="section education reveal"><p className="section-kicker">06 / EDUCATION & TRAINING</p><div className="education-card"><div><p className="project-type">2021 - 2025</p><h2>B.Tech, Electronics &<br /><em>Communication Engineering</em></h2><p>Indian Institute of Information Technology Design and Manufacturing, Kurnool</p></div><div className="cert-list"><p className="certificate-heading">Credentials & training</p>{certificates.map((certificate) => <div key={certificate.title} className="certificate-item"><span><b>{certificate.title}</b><small>{certificate.issuer}</small></span></div>)}</div></div></section>

      <section id="contact" className="contact section reveal"><p className="section-kicker">07 / CONTACT</p><div className="contact-grid"><div><h2>Let’s build something<br /><em>useful together.</em></h2><p>I’m actively open to full-time software engineering and full-stack development opportunities.</p></div><div className="contact-links"><a href={links.email}><span>Email</span><b>moinuddinchistyshaik@gmail.com</b><Icon name="arrow" /></a><External href={links.linkedin}><span>LinkedIn</span><b>Connect professionally</b></External><External href={links.github}><span>GitHub</span><b>Explore my code</b></External></div></div></section>
    </main>
    <footer><a className="brand" href="#top">MCS<span>.</span></a><p>© {new Date().getFullYear()} Moinuddin Chisty Shaik. Built with intent.</p><a href="#top">Back to top ↑</a></footer>
  </>;
}

function Timeline({ date, title, company, text, active }) {
  return <article className={active ? 'current' : ''}><div className="timeline-date">{date}</div><div><p className="project-type">{company}</p><h3>{title}</h3><p>{text}</p></div></article>;
}

export default App;
