'use client'

import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'
import {
  ArrowUpRight,
  Cloud,
  Code2,
  Database,
  Download,
  Globe,
  Layout,
  Link as LinkIcon,
  Mail,
  PawPrint,
  Server,
  Sparkles,
} from 'lucide-react'

const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-10 flex flex-col items-center text-center">
      <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
        <PawPrint className="h-3.5 w-3.5" />
        {eyebrow}
      </span>
      <h2 className="mt-3 font-script text-4xl text-foreground sm:text-5xl">{title}</h2>
    </div>
  )
}

function Section({
  id,
  children,
  className = '',
}: {
  id: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      className={`mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 ${className}`}
    >
      {children}
    </motion.section>
  )
}

const SKILLS: { group: string; icon: typeof Code2; items: string[] }[] = [
  { group: 'Frontend', icon: Layout, items: ['React', 'Next.js', 'Vite', 'TypeScript'] },
  { group: 'Backend', icon: Server, items: ['Node.js', 'ASP.NET Core', 'FastAPI', 'C#', 'Python'] },
  { group: 'Database & Ops', icon: Database, items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Docker', 'Linux'] },
  { group: 'ML & AI', icon: Cloud, items: ['TensorFlow', 'PyTorch', 'OpenCV', 'NLP', 'CNN/LSTM'] },
]

const PROJECTS = [
  {
    title: 'Real-Time Video Proctoring',
    tag: 'AI System',
    desc: 'Engineered exam monitoring with WebSocket, OpenCV & MediaPipe for reliable violation detection.',
    stack: ['WebSocket', 'OpenCV', 'MediaPipe'],
  },
  {
    title: 'AI Resume Parser',
    tag: 'NLP Tool',
    desc: 'Built an NLP parser extracting structured JSON from PDFs; reduced screening time by 8hrs/week.',
    stack: ['Python', 'NLP', 'JSON'],
  },
  {
    title: 'Diaspora Job Marketplace',
    tag: 'Job Platform',
    desc: 'Launched a production job platform with JWT auth, OAuth, and payment integration.',
    stack: ['Next.js', 'OAuth', 'Payments'],
  },
]

const EXPERIENCE = [
  { role: 'Software Engineer Intern', org: 'PepHub', period: 'Oct 2025 — Present', desc: 'Engineered 3 full-stack platforms (Next.js, ASP.NET Core, Vite) with fast load times and reliable payments. Managed 3 production deployments.' },
  { role: 'Software Engineer Intern', org: 'Cardiacrhythm (HealthTech)', period: 'Jun 2025 — Sep 2025', desc: 'Built WebSocket real-time ECG streaming infrastructure supporting 200+ concurrent streams with latency reduced to 180ms.' },
  { role: 'Software Engineer Intern', org: 'RevMaxx (HealthTech)', period: 'Jan 2025 — Jun 2025', desc: 'Developed HIPAA-compliant medical transcription backend and built an AI microservice for medical entity extraction using NLP.' },
  { role: 'Research Engineer Intern', org: 'IEDC, UEM Kolkata', period: 'Dec 2024 — Dec 2025', desc: 'Developed brain tumor classification via CNN-LSTM. Architected the "Satyameba" HPC cluster with Ansible automation.' },
]

export function AboutSection() {
  return (
    <Section id="about">
      <SectionHeading eyebrow="About" title="Nice to meet you" />
      <div className="grid gap-6 lg:grid-cols-3">
        <motion.p
          variants={reveal}
          className="glass-panel rounded-2xl p-6 text-pretty leading-relaxed text-muted-foreground lg:col-span-2"
        >
          I&apos;m Soumika, a Computer Science student and software engineer who loves turning fuzzy ideas into fast, delightful products. Currently pursuing my B.Tech at IEM Newtown, I specialize in full-stack development, backend systems, and AI/ML. When I&apos;m not shipping code, you&apos;ll find me with a warm cup of coffee and a very opinionated cat supervising my commits.
        </motion.p>
        <motion.div variants={reveal} className="glass-panel flex flex-col justify-center gap-4 rounded-2xl p-6">
          {[
            { icon: Code2, label: 'Clean, typed, tested code' },
            { icon: Sparkles, label: 'Design-minded engineering' },
            { icon: PawPrint, label: 'Cat-approved commits' },
          ].map((r) => (
            <div key={r.label} className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/15 ring-1 ring-primary/30">
                <r.icon className="h-4 w-4 text-primary" />
              </span>
              <span className="text-sm text-foreground">{r.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}

export function SkillsSection() {
  return (
    <Section id="skills">
      <SectionHeading eyebrow="Skills" title="My toolbox" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SKILLS.map((s) => (
          <motion.div key={s.group} variants={reveal} className="glass-panel rounded-2xl p-6">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
              <s.icon className="h-5 w-5 text-primary" />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-foreground">{s.group}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {s.items.map((i) => (
                <li key={i} className="rounded-full bg-white/5 px-3 py-1 text-xs text-muted-foreground ring-1 ring-border">
                  {i}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

export function ProjectsSection() {
  return (
    <Section id="projects">
      <SectionHeading eyebrow="Projects" title="Things I've built" />
      <div className="grid gap-6 md:grid-cols-3">
        {PROJECTS.map((p) => (
          <motion.article
            key={p.title}
            variants={reveal}
            className="glass-panel group flex flex-col rounded-2xl p-6 transition hover:ring-primary/40"
          >
            <div className="flex items-start justify-between">
              <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary ring-1 ring-primary/30">
                {p.tag}
              </span>
              <ArrowUpRight className="h-5 w-5 text-muted-foreground transition group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-foreground">{p.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {p.stack.map((t) => (
                <li key={t} className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-muted-foreground ring-1 ring-border">
                  {t}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}

export function ExperienceSection() {
  return (
    <Section id="experience">
      <SectionHeading eyebrow="Experience" title="My journey" />
      <div className="relative mx-auto max-w-3xl">
        <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-accent/40 to-transparent sm:left-1/2" />
        <div className="flex flex-col gap-8">
          {EXPERIENCE.map((e, i) => (
            <motion.div
              key={`${e.role}-${e.org}`}
              variants={reveal}
              className={`relative pl-10 sm:w-1/2 sm:pl-0 ${i % 2 === 0 ? 'sm:self-start sm:pr-10 sm:text-right' : 'sm:self-end sm:pl-10'}`}
            >
              <span className={`absolute left-1.5 top-1.5 h-3 w-3 rounded-full bg-primary ring-4 ring-primary/20 sm:left-auto ${i % 2 === 0 ? 'sm:-right-1.5' : 'sm:-left-1.5'}`} />
              <div className="glass-panel rounded-2xl p-5">
                <span className="text-xs font-semibold uppercase tracking-wide text-accent">{e.period}</span>
                <h3 className="mt-1 text-lg font-semibold text-foreground">{e.role}</h3>
                <p className="text-sm text-primary">{e.org}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

export function ResumeSection() {
  return (
    <Section id="resume">
      <motion.div variants={reveal} className="glass-panel flex flex-col items-center gap-5 rounded-3xl p-10 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/15 ring-1 ring-primary/30">
          <Download className="h-6 w-6 text-primary" />
        </span>
        <h2 className="font-script text-4xl text-foreground sm:text-5xl">Grab my resume</h2>
        <p className="max-w-md text-pretty text-muted-foreground">
          Want the full story? Download my CV for a detailed look at my experience, skills and the
          projects I&apos;m most proud of.
        </p>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_24px_rgba(255,108,182,0.5)] transition hover:shadow-[0_0_34px_rgba(255,108,182,0.75)] outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          Download CV
          <Download className="h-4 w-4" />
        </a>
      </motion.div>
    </Section>
  )
}

export function ContactSection() {
  return (
    <Section id="contact">
      <SectionHeading eyebrow="Contact" title="Let's build something" />
      <motion.div variants={reveal} className="glass-panel mx-auto flex max-w-2xl flex-col items-center gap-6 rounded-3xl p-10 text-center">
        <div className="relative h-24 w-24 overflow-hidden rounded-full ring-4 ring-primary/20 sm:h-32 sm:w-32">
          <Image src="/profile.jpg" alt="Soumika Das" fill className="object-cover" />
        </div>
        <p className="text-pretty text-muted-foreground">
          Have a project, a role, or just want to talk about cats and clean code? My inbox is always open.
        </p>
        <a
          href="mailto:dassoumika11@gmail.com"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_24px_rgba(255,108,182,0.5)] transition hover:shadow-[0_0_34px_rgba(255,108,182,0.75)] outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Mail className="h-4 w-4" />
          dassoumika11@gmail.com
        </a>
        <div className="flex gap-3">
          {[
            { icon: Code2, label: 'GitHub', href: 'https://github.com/Soumika-11' },
            { icon: LinkIcon, label: 'LinkedIn', href: 'https://www.linkedin.com/in/soumikadas/' },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-border transition hover:bg-white/10 hover:text-primary outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <s.icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </motion.div>
    </Section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
      <p className="flex items-center justify-center gap-1.5">
        Built with <span className="text-primary">♥</span> and a lot of caffeine by Soumika ☕🐱
      </p>
    </footer>
  )
}
