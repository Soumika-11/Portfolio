'use client'

import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'
import {
  ArrowUpRight,
  BookOpen,
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
    <div className="mb-8 sm:mb-12 flex flex-col items-center text-center px-2">
      <span className="flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-primary">
        <PawPrint className="h-3.5 w-3.5" />
        {eyebrow}
      </span>
      <h2 className="mt-2 sm:mt-3 font-script text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-foreground tracking-tight">{title}</h2>
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
      viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      className={`mx-auto max-w-6xl 2xl:max-w-7xl 3xl:max-w-[90rem] scroll-mt-20 sm:scroll-mt-24 px-3 xs:px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-24 ${className}`}
      style={{
        paddingLeft: 'max(0.75rem, env(safe-area-inset-left, 0px))',
        paddingRight: 'max(0.75rem, env(safe-area-inset-right, 0px))',
      }}
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

const PUBLICATIONS = [
  {
    title: 'Enhancing Brain Tumor Diagnosis with Ensemble Deep Learning Technique for Improved Accuracy',
    altTitle: 'Brain Tumor Detection using CNN-LSTM',
    conference: '2nd International Conference on Artificial Intelligence and Sustainable Computing (AISC 2025)',
    venue: 'Springer AISC Series',
    sponsors: 'Technically Co-Sponsored by IEEE Kolkata Section & Springer',
    dates: 'July 24–26, 2025',
    organizers:
      'Dept. of IT, B. P. Poddar Institute of Management & Technology and A. K. Choudhury School of IT, University of Calcutta',
    authors: [
      { name: 'Apurba Nandi', isMe: false },
      { name: 'Tista Mukherjee', isMe: false },
      { name: 'Soumika Das', isMe: true },
      { name: 'Nitu Saha', isMe: false },
      { name: 'Sayantani Das', isMe: false },
      { name: 'Sandip Mandal', isMe: false },
    ],
    summary:
      'Engineered an ensemble deep learning framework combining Convolutional Neural Networks (CNN) and Long Short-Term Memory (LSTM) networks across 3,200+ MRI scans. Evaluated high diagnostic accuracy and robustness for multi-class brain tumor classification while reducing single-model variance.',
    highlights: [
      '3,200+ MRI Scans',
      'CNN-LSTM Hybrid',
      'Ensemble Learning',
      'Springer AISC',
      'IEEE Kolkata Section',
    ],
    image: '/paper-publication.jpg',
    imageAlt: 'Certificate of Appreciation for AISC 2025 Conference Paper',
    redirectUrl:
      'https://www.linkedin.com/in/soumikadas/overlay/1768775586821/single-media-viewer/?profileId=ACoAADjotgUBcxQ5xZJAVK0yId5IZyYXuEPqmJo',
    profileUrl: 'https://www.linkedin.com/in/soumikadas/',
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
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        <motion.p
          variants={reveal}
          className="glass-panel rounded-2xl p-4 sm:p-6 text-pretty text-sm sm:text-base leading-relaxed text-muted-foreground lg:col-span-2"
        >
          I&apos;m Soumika, a Computer Science student and software engineer who loves turning fuzzy ideas into fast, delightful products. Currently pursuing my B.Tech at IEM Newtown, I specialize in full-stack development, backend systems, and AI/ML. When I&apos;m not shipping code, you&apos;ll find me with a warm cup of coffee and a very opinionated cat supervising my commits.
        </motion.p>
        <motion.div variants={reveal} className="glass-panel flex flex-col justify-center gap-3.5 sm:gap-4 rounded-2xl p-4 sm:p-6">
          {[
            { icon: Code2, label: 'Clean, typed, tested code' },
            { icon: Sparkles, label: 'Design-minded engineering' },
            { icon: PawPrint, label: 'Cat-approved commits' },
          ].map((r) => (
            <div key={r.label} className="flex items-center gap-3">
              <span className="grid h-8 w-8 sm:h-9 sm:w-9 shrink-0 place-items-center rounded-full bg-primary/15 ring-1 ring-primary/30">
                <r.icon className="h-4 w-4 text-primary" />
              </span>
              <span className="text-xs sm:text-sm text-foreground font-medium">{r.label}</span>
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
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        {SKILLS.map((s) => (
          <motion.div key={s.group} variants={reveal} className="glass-panel rounded-2xl p-3 sm:p-5">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 sm:h-9 sm:w-9 shrink-0 place-items-center rounded-lg sm:rounded-xl bg-primary/15 ring-1 ring-primary/30">
                <s.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
              </span>
              <h3 className="text-sm sm:text-base font-semibold text-foreground leading-tight">{s.group}</h3>
            </div>
            <ul className="mt-2.5 flex flex-wrap gap-1 sm:gap-1.5">
              {s.items.map((i) => (
                <li key={i} className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] sm:text-[11px] text-muted-foreground ring-1 ring-border">
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
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p) => (
          <motion.article
            key={p.title}
            variants={reveal}
            className="glass-panel group flex flex-col justify-between rounded-2xl p-4 sm:p-6 transition hover:ring-primary/40"
          >
            <div>
              <div className="flex items-start justify-between">
                <span className="rounded-full bg-primary/15 px-2.5 py-1 text-xs font-medium text-primary ring-1 ring-primary/30">
                  {p.tag}
                </span>
                <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground transition group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
              <h3 className="mt-3 sm:mt-4 text-lg sm:text-xl font-semibold text-foreground tracking-tight">{p.title}</h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
            </div>
            <ul className="mt-4 flex flex-wrap gap-1.5 sm:gap-2 pt-2">
              {p.stack.map((t) => (
                <li key={t} className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] sm:text-[11px] text-muted-foreground ring-1 ring-border">
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

export function PublicationsSection() {
  return (
    <Section id="publications">
      <SectionHeading eyebrow="Research" title="Papers & Publications" />
      <div className="flex flex-col gap-6 sm:gap-8">
        {PUBLICATIONS.map((pub) => (
          <motion.article
            key={pub.title}
            variants={reveal}
            className="glass-panel group overflow-hidden rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 transition hover:ring-primary/40"
          >
            <div className="grid gap-6 sm:gap-8 lg:grid-cols-12 lg:items-center">
              {/* Image Preview & Redirect */}
              <div className="relative lg:col-span-5">
                <a
                  href={pub.redirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/img relative block overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-black/20 shadow-2xl transition hover:border-primary/50 outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="View paper certificate on LinkedIn"
                >
                  <div className="relative aspect-[800/559] w-full overflow-hidden">
                    <Image
                      src={pub.image}
                      alt={pub.imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    />
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 opacity-70 transition-opacity duration-300 group-hover/img:opacity-90" />

                    {/* Overlay content */}
                    <div className="absolute inset-0 flex flex-col justify-between p-3 xs:p-4 sm:p-5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="rounded-full bg-primary/25 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-semibold text-white backdrop-blur-md ring-1 ring-primary/50">
                          AISC 2025 Certificate
                        </span>
                        <span className="grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md transition group-hover/img:bg-primary group-hover/img:text-primary-foreground">
                          <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition group-hover/img:translate-x-0.5 group-hover/img:-translate-y-0.5" />
                        </span>
                      </div>

                      <div className="flex items-center gap-2 rounded-lg bg-black/40 px-2.5 py-1.5 sm:px-3 sm:py-2 text-[10px] sm:text-xs font-medium text-white/90 backdrop-blur-sm">
                        <LinkIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary shrink-0" />
                        <span className="truncate">Click to view post on LinkedIn</span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>

              {/* Publication Details */}
              <div className="flex flex-col gap-3.5 sm:gap-4 lg:col-span-7">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="rounded-full bg-primary/15 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs font-semibold text-primary ring-1 ring-primary/30">
                    {pub.venue}
                  </span>
                  <span className="rounded-full bg-accent/15 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs font-medium text-accent ring-1 ring-accent/30">
                    IEEE Co-Sponsored
                  </span>
                  <span className="rounded-full bg-white/5 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs text-muted-foreground ring-1 ring-border">
                    {pub.dates}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg xs:text-xl sm:text-2xl font-bold tracking-tight text-foreground break-words">
                    {pub.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm font-medium text-primary">
                    {pub.conference}
                  </p>
                </div>

                {/* Authors Box */}
                <div className="rounded-xl bg-white/5 p-3 sm:p-3.5 ring-1 ring-border/60">
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Authors:
                  </span>
                  <p className="mt-1 text-xs leading-relaxed text-foreground/90 break-words">
                    {pub.authors.map((author, i) => (
                      <span key={author.name}>
                        <span
                          className={
                            author.isMe
                              ? 'font-bold text-primary underline underline-offset-2'
                              : 'text-muted-foreground'
                          }
                        >
                          {author.name}
                        </span>
                        {i < pub.authors.length - 1 && ', '}
                      </span>
                    ))}
                  </p>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  {pub.summary}
                </p>

                {/* Highlights tags */}
                <ul className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                  {pub.highlights.map((h) => (
                    <li
                      key={h}
                      className="rounded-full bg-white/5 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs text-muted-foreground ring-1 ring-border"
                    >
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Actions */}
                <div className="flex flex-col xs:flex-row flex-wrap items-stretch xs:items-center gap-2.5 sm:gap-3 pt-2">
                  <a
                    href={pub.redirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full xs:w-auto items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 sm:px-5 text-xs sm:text-sm font-semibold text-primary-foreground shadow-[0_0_20px_rgba(255,108,182,0.4)] transition hover:shadow-[0_0_28px_rgba(255,108,182,0.7)] outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[44px]"
                  >
                    View on LinkedIn
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={pub.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full xs:w-auto items-center justify-center gap-2 rounded-full ring-1 ring-border px-4 py-2.5 sm:px-5 text-xs sm:text-sm font-medium text-foreground transition hover:bg-white/10 hover:text-primary outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[44px]"
                  >
                    <LinkIcon className="h-3.5 w-3.5" />
                    LinkedIn Profile
                  </a>
                </div>
              </div>
            </div>
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
        <div className="absolute left-3 sm:left-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-accent/40 to-transparent" />
        <div className="flex flex-col gap-6 sm:gap-8">
          {EXPERIENCE.map((e, i) => (
            <motion.div
              key={`${e.role}-${e.org}`}
              variants={reveal}
              className={`relative pl-8 xs:pl-10 sm:w-1/2 sm:pl-0 ${i % 2 === 0 ? 'sm:self-start sm:pr-8 md:sm:pr-10 sm:text-right' : 'sm:self-end sm:pl-8 md:sm:pl-10'
                }`}
            >
              <div className="glass-panel rounded-xl sm:rounded-2xl p-4 sm:p-5">
                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-accent">{e.period}</span>
                <h3 className="mt-1 text-base sm:text-lg font-semibold text-foreground">{e.role}</h3>
                <p className="text-xs sm:text-sm text-primary font-medium">{e.org}</p>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">{e.desc}</p>
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
      <motion.div variants={reveal} className="glass-panel flex flex-col items-center gap-4 sm:gap-5 rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-center">
        <span className="grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-2xl bg-primary/15 ring-1 ring-primary/30">
          <Download className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
        </span>
        <h2 className="font-script text-3xl xs:text-4xl sm:text-5xl text-foreground">Grab my resume</h2>
        <p className="max-w-md text-pretty text-xs sm:text-sm text-muted-foreground">
          Want the full story? Download my CV for a detailed look at my experience, skills and the
          projects I&apos;m most proud of.
        </p>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full xs:w-auto items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 sm:px-6 text-xs sm:text-sm font-semibold text-primary-foreground shadow-[0_0_24px_rgba(255,108,182,0.5)] transition hover:shadow-[0_0_34px_rgba(255,108,182,0.75)] outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[44px]"
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
      <motion.div variants={reveal} className="glass-panel mx-auto flex max-w-2xl flex-col items-center gap-5 sm:gap-6 rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-center">
        <div className="relative h-20 w-20 xs:h-24 xs:w-24 sm:h-32 sm:w-32 overflow-hidden rounded-full ring-4 ring-primary/20 shrink-0">
          <Image src="/profile.jpg" alt="Soumika Das" fill className="object-cover" sizes="128px" />
        </div>
        <p className="text-pretty text-xs sm:text-sm text-muted-foreground">
          Have a project, a role, or just want to talk about cats and clean code? My inbox is always open.
        </p>
        <a
          href="mailto:dassoumika11@gmail.com"
          className="inline-flex w-full xs:w-auto max-w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 sm:px-6 text-xs sm:text-sm font-semibold text-primary-foreground shadow-[0_0_24px_rgba(255,108,182,0.5)] transition hover:shadow-[0_0_34px_rgba(255,108,182,0.75)] outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[44px]"
        >
          <Mail className="h-4 w-4 shrink-0" />
          <span className="truncate sm:overflow-visible">dassoumika11@gmail.com</span>
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
              className="grid h-11 w-11 min-w-[44px] min-h-[44px] place-items-center rounded-full ring-1 ring-border transition hover:bg-white/10 hover:text-primary outline-none focus-visible:ring-2 focus-visible:ring-primary touch-manipulation"
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
    <footer
      className="border-t border-border py-6 sm:py-8 text-center text-xs sm:text-sm text-muted-foreground px-4"
      style={{ paddingBottom: 'max(1.5rem, calc(env(safe-area-inset-bottom, 0px) + 1rem))' }}
    >
      <p className="flex items-center justify-center gap-1.5">
        Built with <span className="text-primary">♥</span> and a lot of caffeine by Soumika ☕🐱
      </p>
    </footer>
  )
}
