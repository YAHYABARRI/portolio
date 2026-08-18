"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, PointerEvent, useEffect, useRef, useState } from "react";

type Project = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  type: "quickship" | "route" | "port" | "urban";
  accent: string;
  stack: string[];
  features: string[];
  architecture: string[];
  github: string;
  focus: string;
};

const skillGroups = [
  { id: "data", label: "Data & AI", code: "01", skills: ["Python", "Pandas", "NumPy", "Scikit-learn", "Machine Learning", "XGBoost", "Random Forest"] },
  { id: "backend", label: "Backend", code: "02", skills: ["Java", "Spring Boot", "Django REST", "Node.js"] },
  { id: "frontend", label: "Frontend", code: "03", skills: ["React", "Angular", "JavaScript", "Tailwind CSS"] },
  { id: "database", label: "Databases", code: "04", skills: ["MySQL", "PostgreSQL", "MongoDB", "SQL Server", "Oracle"] },
  { id: "tools", label: "Tools", code: "05", skills: ["Git", "GitHub", "Docker", "Postman", "Maven"] },
];

const projects: Project[] = [
  {
    id: "quickship",
    number: "01",
    title: "QuickShip",
    subtitle: "Full Stack Delivery Platform",
    description: "A complete delivery management platform designed around clear roles, real-time operational visibility and a reliable end-to-end workflow.",
    type: "quickship",
    accent: "#83f9cf",
    stack: ["React", "Spring Boot", "MySQL", "JWT"],
    features: ["JWT authentication", "Client & courier management", "Delivery operations", "Admin dashboard", "PDF invoices", "Data filtering", "Morocco map", "REST API"],
    architecture: ["React client", "Spring REST API", "JWT services", "MySQL"],
    github: "https://github.com/YAHYABARRI/livraisonV2",
    focus: "SaaS / Logistics",
  },
  {
    id: "smart-route",
    number: "02",
    title: "Smart Route Prediction",
    subtitle: "AI-powered Route Duration Prediction",
    description: "A data-driven routing experience that combines geographic computation with a Random Forest model to predict travel duration.",
    type: "route",
    accent: "#9185ff",
    stack: ["Python", "Scikit-learn", "Random Forest", "OSRM", "React", "Spring Boot"],
    features: ["Interactive map", "Route calculation", "ML prediction", "Random Forest model", "Geographic data", "REST API", "Prediction interface"],
    architecture: ["Start point", "OSRM route", "AI model", "Predicted duration"],
    github: "https://github.com/YAHYABARRI",
    focus: "Machine Learning",
  },
  {
    id: "port-operations",
    number: "03",
    title: "Port Operations Management",
    subtitle: "Maritime Operations System",
    description: "An industrial-grade web application for tracking vessels, terminals, maritime agents and port operations from one coherent interface.",
    type: "port",
    accent: "#8cc8ff",
    stack: ["Angular", "Spring Boot", "MySQL"],
    features: ["Vessel management", "Terminal management", "Maritime agents", "Operations tracking", "Operational dashboard", "REST API", "Data management"],
    architecture: ["Angular console", "Spring API", "Operations layer", "MySQL"],
    github: "https://github.com/YAHYABARRI/gestion_des_OPS_Portuaires",
    focus: "Industrial / Maritime",
  },
  {
    id: "urban-reporting",
    number: "04",
    title: "Urban Problems Reporting",
    subtitle: "Citizen Reporting Platform",
    description: "A map-first platform that lets citizens report urban issues and gives teams a modern interface to locate and manage every signalement.",
    type: "urban",
    accent: "#f0ad78",
    stack: ["Django REST", "React", "Database"],
    features: ["Issue reporting", "Interactive map", "Geolocation", "Report management", "REST API", "Modern interface"],
    architecture: ["React map", "Django REST", "Geo reports", "Database"],
    github: "https://github.com/YAHYABARRI/Signalement-des-probl-mes-urbains",
    focus: "Civic Tech",
  },
];

const certifications = [
  { mark: "IBM", title: "Machine Learning", issuer: "IBM", tone: "mint" },
  { mark: "G", title: "Machine Learning", issuer: "Google", tone: "violet" },
  { mark: "SF", title: "AI · Data · Automation", issuer: "Salesforce", tone: "blue" },
];

const navItems = ["about", "skills", "projects", "certifications", "contact"];

function SectionHeading({ index, label, title, muted }: { index: string; label: string; title: string; muted?: string }) {
  return (
    <div className="section-heading reveal">
      <p className="section-kicker"><span>{index}</span> {label}</p>
      <h2>{title}{muted && <><br /><em>{muted}</em></>}</h2>
    </div>
  );
}

function ProjectVisual({ type, compact = false }: { type: Project["type"]; compact?: boolean }) {
  if (type === "quickship") {
    return (
      <div className={`project-visual visual-quickship ${compact ? "compact" : ""}`} aria-hidden="true">
        <div className="mock-window-bar"><i /><i /><i /><span>QUICKSHIP / CONTROL</span></div>
        <div className="quick-sidebar"><b>Q</b><i /><i /><i /><i /></div>
        <div className="quick-main">
          <div className="mock-title"><span>Good morning, Yahya</span><small>OPERATIONS OVERVIEW</small></div>
          <div className="metric-row"><div><small>DELIVERIES</small><b>1,284</b></div><div><small>IN TRANSIT</small><b>048</b></div><div><small>SUCCESS RATE</small><b>96.4%</b></div></div>
          <div className="quick-grid">
            <div className="mock-map"><span className="route-line route-a" /><span className="route-line route-b" /><i className="map-point p1" /><i className="map-point p2" /><i className="map-point p3" /><b>CASABLANCA</b></div>
            <div className="delivery-list"><small>RECENT DELIVERIES</small>{["QS-2841", "QS-2838", "QS-2834"].map((item, i) => <p key={item}><span>{item}</span><i className={`status-${i}`} /></p>)}</div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "route") {
    return (
      <div className={`project-visual visual-route ${compact ? "compact" : ""}`} aria-hidden="true">
        <div className="mock-window-bar"><i /><i /><i /><span>ROUTE / PREDICTION</span></div>
        <div className="route-map"><div className="map-roads" /><i className="route-pin start" /><i className="route-pin end" /><span className="prediction-path" /></div>
        <div className="route-panel"><small>AI ROUTE ANALYSIS</small><h4>Casablanca <span>→</span> Rabat</h4><div className="duration-ring"><div><b>72</b><span>MIN</span></div></div><div className="confidence-line"><span>MODEL CONFIDENCE</span><b>94.2%</b></div><div className="confidence-track"><i /></div></div>
        <div className="model-flow"><span>START</span><i>→</i><span>ROUTE</span><i>→</i><span className="active">AI MODEL</span><i>→</i><span>DURATION</span></div>
      </div>
    );
  }

  if (type === "port") {
    return (
      <div className={`project-visual visual-port ${compact ? "compact" : ""}`} aria-hidden="true">
        <div className="mock-window-bar"><i /><i /><i /><span>PORT OPS / LIVE</span></div>
        <div className="port-head"><div><small>ACTIVE OPERATIONS</small><b>Terminal overview</b></div><span><i /> LIVE DATA</span></div>
        <div className="port-grid"><div className="port-map"><span className="water-lines" /><div className="terminal t1">T1</div><div className="terminal t2">T2</div><div className="ship ship-a">▰</div><div className="ship ship-b">▰</div></div><div className="port-stats"><p><span>VESSELS</span><b>12</b></p><p><span>BERTHS</span><b>08</b></p><p><span>OPERATIONS</span><b>27</b></p></div></div>
        <div className="port-timeline"><i /><span /><i /><span /><i /><span /><i /></div>
      </div>
    );
  }

  return (
    <div className={`project-visual visual-urban ${compact ? "compact" : ""}`} aria-hidden="true">
      <div className="mock-window-bar"><i /><i /><i /><span>URBAN / REPORTS</span></div>
      <div className="urban-map"><div className="urban-roads" />{["u1", "u2", "u3", "u4", "u5"].map((pin, i) => <i className={`urban-pin ${pin}`} key={pin}><span>{i + 1}</span></i>)}<div className="urban-card"><small>NEW REPORT</small><b>Road issue detected</b><p>Casablanca · 2 min ago</p><span>VIEW DETAILS →</span></div></div>
      <div className="urban-legend"><span><i className="urgent" /> URGENT</span><span><i /> IN REVIEW</span><b>24 ACTIVE REPORTS</b></div>
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timeout = window.setTimeout(() => closeRef.current?.focus(), 120);
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(timeout);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div className="modal-shell" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
          <motion.div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" initial={{ y: 40, scale: .98, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 24, scale: .98, opacity: 0 }} transition={{ type: "spring", stiffness: 260, damping: 28 }}>
            <div className="modal-topbar"><span>{project.number} / PROJECT FILE</span><button ref={closeRef} onClick={onClose} aria-label="Close project details">Close <i>×</i></button></div>
            <div className="modal-content">
              <div className="modal-intro"><p>{project.focus}</p><h3 id="project-modal-title">{project.title}</h3><span>{project.subtitle}</span></div>
              <ProjectVisual type={project.type} compact />
              <div className="modal-grid">
                <section><small>OVERVIEW</small><p>{project.description}</p></section>
                <section><small>FEATURES</small><ul>{project.features.map((feature) => <li key={feature}><i />{feature}</li>)}</ul></section>
                <section><small>TECH STACK</small><div className="modal-tags">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div></section>
                <section className="architecture"><small>ARCHITECTURE</small><div>{project.architecture.map((step, index) => <span key={step}><b>{String(index + 1).padStart(2, "0")}</b>{step}{index < project.architecture.length - 1 && <i>→</i>}</span>)}</div></section>
              </div>
              <div className="modal-links"><span className="link-disabled" aria-disabled="true">Live demo <i>Not published</i></span><a href={project.github} target="_blank" rel="noreferrer">View GitHub <i>↗︎</i></a></div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  const [activeSkill, setActiveSkill] = useState(skillGroups[0].id);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const [formStatus, setFormStatus] = useState("");
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealElements = document.querySelectorAll<HTMLElement>(".reveal");
    if (reduceMotion) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
    } else {
      const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: .12 });
      revealElements.forEach((element) => revealObserver.observe(element));
      return () => revealObserver.disconnect();
    }
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("main section[id]");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id)), { rootMargin: "-42% 0px -48%", threshold: 0 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let x = -100;
    let y = -100;
    const move = (event: MouseEvent) => {
      x = event.clientX; y = event.clientY;
      cursorRef.current?.classList.add("is-visible");
      cursorDotRef.current?.classList.add("is-visible");
      cursorDotRef.current?.style.setProperty("transform", `translate3d(${x}px, ${y}px, 0)`);
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => cursorRef.current?.style.setProperty("transform", `translate3d(${x}px, ${y}px, 0)`));
    };
    const over = (event: MouseEvent) => cursorRef.current?.classList.toggle("is-active", Boolean((event.target as HTMLElement).closest("a, button, [data-cursor]")));
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); };
  }, []);

  const selectedSkill = skillGroups.find((group) => group.id === activeSkill) ?? skillGroups[0];

  const handleCardPointer = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`Portfolio contact — ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    setFormStatus("Opening your email client…");
    window.setTimeout(() => { window.location.href = `mailto:yahyabarri25@gmail.com?subject=${subject}&body=${body}`; }, 320);
  };

  return (
    <>
      <div className="cursor-ring" ref={cursorRef} aria-hidden="true" /><div className="cursor-dot" ref={cursorDotRef} aria-hidden="true" />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Yahya Barri — home">YB<span>.</span></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => <a className={activeSection === item ? "active" : ""} href={`#${item}`} key={item}>{item === "certifications" ? "Certs" : item}</a>)}
        </nav>
        <a className="nav-cta magnetic" href="#contact">Let&apos;s talk <span>↗︎</span></a>
        <button className={`menu-toggle ${mobileOpen ? "open" : ""}`} onClick={() => setMobileOpen(!mobileOpen)} aria-expanded={mobileOpen} aria-controls="mobile-menu" aria-label="Toggle navigation"><i /><i /></button>
      </header>
      <AnimatePresence>{mobileOpen && <motion.nav id="mobile-menu" className="mobile-menu" aria-label="Mobile navigation" initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }}>{navItems.map((item, index) => <a href={`#${item}`} key={item} onClick={() => setMobileOpen(false)}><span>0{index + 1}</span>{item}</a>)}</motion.nav>}</AnimatePresence>

      <main>
        <section className="hero" id="top">
          <div className="hero-aura" aria-hidden="true" />
          <div className="hero-copy reveal is-visible">
            <div className="availability"><i /> Available for opportunities</div>
            <p className="eyebrow">YAHYA BARRI <span>/</span> DATA &amp; AI · FULL STACK</p>
            <h1>Building intelligence<br />into <em>every layer.</em></h1>
            <p className="hero-description">I build intelligent digital experiences where <strong>data, AI and modern web technologies</strong> work as one.</p>
            <div className="hero-actions"><a className="button button-primary magnetic" href="#projects">View projects <span>↓</span></a><a className="button button-secondary magnetic" href="#contact">Let&apos;s talk <span>↗︎</span></a></div>
          </div>
          <div className="intelligence-visual reveal is-visible" aria-label="Abstract live AI system visualization">
            <div className="visual-label"><span>LIVE MODEL / YB-01</span><b>DATA STREAM</b></div>
            <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" />
            <div className="core"><span>AI</span><small>ACTIVE</small></div>
            {[[18,24],[45,14],[73,27],[86,54],[66,72],[34,82],[13,61],[48,48]].map(([left, top], index) => <i className={`neural-node node-${index + 1}`} style={{ left: `${left}%`, top: `${top}%` }} key={`${left}-${top}`} />)}
            <div className="signal-card signal-data"><span>DATA IN</span><b>42.8K</b></div><div className="signal-card signal-confidence"><span>CONFIDENCE</span><b>94.2%</b></div>
            <div className="visual-status"><i /> SYSTEMS OPERATIONAL</div>
          </div>
          <a className="scroll-cue" href="#about"><span>Scroll to explore</span><i>↓</i></a><div className="hero-index" aria-hidden="true">01 <span>/</span> 06</div>
        </section>

        <section className="about section-shell" id="about">
          <SectionHeading index="01" label="About" title="Data is the starting point." muted="Impact is the destination." />
          <div className="about-grid">
            <div className="about-copy reveal"><p>I&apos;m a Data &amp; AI student with a Full Stack background, focused on machine learning, intelligent applications and modern web systems.</p><div className="about-tags"><span>Curious by default</span><span>Systems thinker</span><span>Always learning</span></div></div>
            <div className="about-stats reveal">
              <article><span>01</span><b>3+</b><p>Applications<br />built</p></article>
              <article><span>02</span><b>AI</b><p>Data-driven<br />thinking</p></article>
              <article><span>03</span><b>FS</b><p>Full Stack<br />execution</p></article>
              <article><span>04</span><b>∞</b><p>Always<br />learning</p></article>
            </div>
          </div>
          <div className="manifesto reveal"><span>THINK IN DATA</span><i>→</i><span>BUILD IN SYSTEMS</span><i>→</i><span>SHIP WITH INTENT</span></div>
        </section>

        <section className="skills section-shell" id="skills">
          <SectionHeading index="02" label="Capabilities" title="One stack." muted="Multiple ways to solve." />
          <div className="skills-console reveal">
            <div className="skill-tabs" role="tablist" aria-label="Skill categories">
              {skillGroups.map((group) => <button key={group.id} role="tab" aria-selected={activeSkill === group.id} onClick={() => setActiveSkill(group.id)} className={activeSkill === group.id ? "active" : ""}><span>{group.code}</span>{group.label}<i>↗︎</i></button>)}
            </div>
            <div className="skill-display" role="tabpanel">
              <div className="skill-display-head"><p><span>{selectedSkill.code}</span> / {selectedSkill.label.toUpperCase()}</p><small>{String(selectedSkill.skills.length).padStart(2, "0")} TECHNOLOGIES</small></div>
              <AnimatePresence mode="wait"><motion.div className="skill-cloud" key={selectedSkill.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: .28 }}>{selectedSkill.skills.map((skill, index) => <div className="skill-chip" key={skill} style={{ "--delay": `${index * 35}ms` } as React.CSSProperties}><span>{String(index + 1).padStart(2, "0")}</span><b>{skill}</b><i /></div>)}</motion.div></AnimatePresence>
              <div className="skill-system"><div className="system-core">YB</div><span className="system-ring ring-a" /><span className="system-ring ring-b" /><span className="system-label label-a">DATA</span><span className="system-label label-b">LOGIC</span><span className="system-label label-c">SHIP</span></div>
            </div>
          </div>
        </section>

        <section className="projects section-shell" id="projects">
          <div className="projects-intro"><SectionHeading index="03" label="Selected work" title="Built to solve." muted="Designed to be used." /><p className="reveal">Four applications across logistics, predictive AI, industrial operations and civic technology.</p></div>
          <div className="project-list">
            {projects.map((project) => (
              <motion.article className="project-card reveal" key={project.id} onPointerMove={handleCardPointer} whileHover={{ y: -6 }} transition={{ duration: .3 }} style={{ "--project-accent": project.accent } as React.CSSProperties}>
                <div className="card-glow" aria-hidden="true" />
                <div className="project-meta"><span>{project.number} / 04</span><p>{project.focus}</p><button className="project-open" onClick={() => setActiveProject(project)} aria-label={`Open details for ${project.title}`}>Explore case <i>↗︎</i></button></div>
                <div className="project-content"><div><p className="project-subtitle">{project.subtitle}</p><h3>{project.title}</h3><p className="project-description">{project.description}</p><div className="project-tags">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div></div><ProjectVisual type={project.type} /></div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="certifications section-shell" id="certifications">
          <SectionHeading index="04" label="Credentials" title="Proof of learning." muted="Fuel for what comes next." />
          <div className="certificate-grid">
            {certifications.map((certificate, index) => <article className={`certificate-card reveal ${certificate.tone}`} key={`${certificate.issuer}-${certificate.title}`}><div className="cert-top"><span>0{index + 1}</span><i>VERIFIED LEARNING</i></div><div className="cert-mark">{certificate.mark}</div><p>{certificate.issuer}</p><h3>{certificate.title}</h3><div className="cert-bottom"><span>Credential</span><button disabled title="Certificate link not provided">View certificate <i>↗︎</i></button></div></article>)}
          </div>
          <p className="certificate-note reveal">Certificate files and completion years were not provided, so no details have been invented.</p>
        </section>

        <section className="socials section-shell" aria-label="Social links">
          <p className="section-kicker reveal"><span>05</span> Connect</p>
          <div className="social-list reveal">
            <a href="https://github.com/YAHYABARRI" target="_blank" rel="noreferrer"><span>01</span><div><small>CODE &amp; REPOSITORIES</small><b>GitHub</b></div><i>↗︎</i></a>
            <a href="https://www.linkedin.com/in/yahya-barri-00u90e36" target="_blank" rel="noreferrer"><span>02</span><div><small>PROFESSIONAL NETWORK</small><b>LinkedIn</b></div><i>↗︎</i></a>
            <a href="mailto:yahyabarri25@gmail.com"><span>03</span><div><small>DIRECT CONTACT</small><b>Email</b></div><i>↗︎</i></a>
          </div>
        </section>

        <section className="contact section-shell" id="contact">
          <div className="contact-aura" aria-hidden="true" />
          <div className="contact-copy reveal"><p className="section-kicker"><span>06</span> Contact</p><h2>Let&apos;s build something <em>intelligent.</em></h2><p>Have an idea, a technical challenge or simply want to connect? Send a note and start the conversation.</p><a href="mailto:yahyabarri25@gmail.com">yahyabarri25@gmail.com <span>↗︎</span></a></div>
          <form className="contact-form reveal" onSubmit={handleSubmit}>
            <label><span>YOUR NAME</span><input name="name" type="text" autoComplete="name" placeholder="How should I call you?" required /></label>
            <label><span>EMAIL ADDRESS</span><input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
            <label><span>YOUR MESSAGE</span><textarea name="message" placeholder="Tell me about your idea…" rows={5} required /></label>
            <button className="button button-primary" type="submit">Send message <span>↗︎</span></button><p className="form-status" role="status">{formStatus}</p>
          </form>
        </section>
      </main>

      <footer><a className="brand" href="#top">YB<span>.</span></a><p>Designed &amp; built with intent. © 2026 Yahya Barri.</p><a href="#top">Back to top ↑</a></footer>
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </>
  );
}
