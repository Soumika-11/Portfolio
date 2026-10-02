'use client'

import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'
import {
  ArrowUpRight,
  BookOpen,
  Brain,
  Cloud,
  Code2,
  Database,
  Download,
  Globe,
  Layout,
  Link as LinkIcon,
  Mail,
  Mic,
  PawPrint,
  Server,
  Sparkles,
  Terminal,
} from 'lucide-react'

import {
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover,
} from '@/components/ui/animated-slideshow'

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
  {
    group: 'Languages',
    icon: Code2,
    items: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++'],
  },
  {
    group: 'Frontend',
    icon: Layout,
    items: ['React', 'Next.js', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Vite'],
  },
  {
    group: 'Backend',
    icon: Server,
    items: ['Node.js', 'Express', 'Django', 'FastAPI', 'ASP.NET Core', 'REST APIs'],
  },
  {
    group: 'Databases',
    icon: Database,
    items: ['PostgreSQL', 'MySQL', 'MSSQL', 'MongoDB', 'VectorDB'],
  },
  {
    group: 'DevOps & Operations',
    icon: Terminal,
    items: ['Docker', 'Linux', 'Windows', 'DNS Management', 'Domain Routing', 'Nginx', 'CI/CD'],
  },
  {
    group: 'ML & Deep Learning',
    icon: Brain,
    items: [
      'GenAI',
      'LLM',
      'Agentic AI',
      'RAG',
      'Computer Vision',
      'VectorDB',
      'Ensemble Learning',
      'CNN',
      'U-Net',
      'MobileNetV2',
      'DenseNet169',
      'LSTM',
      'PyTorch',
      'TensorFlow',
      'OpenCV',
      'NLP',
    ],
  },
]

interface Project {
  title: string
  tag: string
  desc: string
  stack: string[]
  link?: string
}

const PROJECTS: Project[] = [
  {
    title: 'BONAP Botanical Scraper & Portal',
    tag: 'Web Scraper',
    desc: 'Architected an automated botanical web scraper and ETL pipeline extracting plant taxonomy, county distribution maps, and morphological data across BONAP, USDA, and GBIF. Powers an interactive plant comparison portal with synonym resolution and AI-generated summaries.',
    stack: ['Python', 'Web Scraping', 'Express', 'Node.js'],
    link: 'https://portal.bonap.info',
  },
  {
    title: 'DeepTrust Verification API',
    tag: 'Computer Vision',
    desc: 'Engineered an automated degree verification API using OpenCV and Tesseract OCR to cross-verify QR code payloads against academic document text with confidence scoring.',
    stack: ['Python', 'OpenCV', 'Tesseract OCR', 'Computer Vision'],
    link: 'https://github.com/Soumika-11/deeptrust',
  },
  {
    title: 'Photography UK',
    tag: 'Web Platform',
    desc: 'Full-stack photography portfolio and event booking platform with dynamic image galleries, client scheduling workflows, and retail merchandise checkout.',
    stack: ['Next.js', 'React', 'Tailwind CSS', 'JavaScript'],
    link: 'https://github.com/Soumika-11/Photography-UK',
  },
  {
    title: 'Real-Time Video Proctoring',
    tag: 'AI System',
    desc: 'Engineered exam monitoring with WebSocket, OpenCV & MediaPipe for reliable violation detection.',
    stack: ['WebSocket', 'OpenCV', 'MediaPipe'],
    link: 'https://github.com/Soumika-11/Video-Proctor',
  },
  {
    title: 'AI Resume Parser',
    tag: 'NLP Tool',
    desc: 'Built an NLP parser extracting structured JSON from PDFs; reduced screening time by 8hrs/week.',
    stack: ['Python', 'NLP', 'JSON'],
    link: 'https://github.com/Soumika-11/Resume-Parser',
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

const VOLUNTEERING = [
  {
    badge: 'Google Developer Groups',
    role: 'Cloud Lead & Speaker',
    org: 'Google Developer Groups on Campus',
    chapter: 'University of Engineering & Management, Kolkata',
    period: '2024 — 2026',
    summary:
      'Led the Cloud domain on the core team of my university’s Google Developer Group — helping run community sessions and hands-on workshops, and closing out my tenure with my first talk as a speaker.',
    highlights: ['Tech Speaker', 'Google Cloud', 'Core Team', 'Workshops', 'Community Building'],
    links: [
      {
        label: 'Verify on GDG',
        href: 'https://gdg.community.dev/gdg-on-campus-university-of-engineering-management-kolkata-india/',
      },
      { label: 'GDG Profile', href: 'https://gdg.community.dev/u/soumika/' },
    ],
    eventsLabel: 'Talks & events:',
    events: [
      {
        title: 'Tech and Adda: Where Tech Meets Conversations',
        tag: 'First Talk as Speaker',
        date: 'May 16, 2026',
        format: 'In-Person Session',
        desc: 'My first session as a speaker — a cloud talk on how apps survive thousands of users, delivered at UEM Kolkata alongside co-speaker Biswajit Chatterjee, GDG IoT Lead. It was also my final event as Cloud Lead.',
        link: 'https://www.linkedin.com/feed/update/urn:li:activity:7462911880844681216/',
        images: [
          {
            src: '/volunteering/gdg-talk-1.jpg',
            alt: 'Soumika Das presenting “How Apps Survive Thousands of Users” at a GDG on Campus UEM Kolkata session',
          },
          {
            src: '/volunteering/gdg-talk-2.jpg',
            alt: 'Soumika Das speaking to a room of students during her cloud session',
          },
          {
            src: '/volunteering/gdg-talk-3.jpg',
            alt: 'Soumika Das with a microphone in a Google Developer Groups on Campus tee',
          },
        ],
      },
      {
        title: 'UEMK GDG Spotlight',
        date: 'Oct 14, 2024',
        format: 'Virtual Session',
        desc: 'Launch session introducing the new GDG on Campus core team and its domain leads, the chapter’s plans for the year, and an open Q&A with students.',
        link: 'https://gdg.community.dev/events/details/google-gdg-on-campus-university-of-engineering-management-kolkata-india-presents-uemk-gdg-spotlight/',
      },
    ],
  },
]

export function AboutSection() {
  return (
    <Section id="about">
      <SectionHeading eyebrow="About" title="Nice to meet you" />
      <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
        <motion.p
          variants={reveal}
          className="glass-panel rounded-2xl p-4 sm:p-6 text-pretty text-sm sm:text-base leading-relaxed text-muted-foreground md:col-span-2"
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
      <div className="grid gap-3.5 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {SKILLS.map((s) => (
          <motion.div key={s.group} variants={reveal} className="glass-panel rounded-2xl p-4 sm:p-5">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 sm:h-9 sm:w-9 shrink-0 place-items-center rounded-lg sm:rounded-xl bg-primary/15 ring-1 ring-primary/30">
                <s.icon className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-primary" />
              </span>
              <h3 className="text-sm sm:text-base font-semibold text-foreground leading-tight">{s.group}</h3>
            </div>
            <ul className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
              {s.items.map((i) => (
                <li
                  key={i}
                  className="rounded-full bg-white dark:bg-white/[0.08] px-3 py-1 text-xs sm:text-[13px] font-semibold text-slate-900 dark:text-purple-50 border border-purple-200/90 dark:border-white/20 shadow-xs select-none"
                >
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

const SERVICES_SLIDES = [
  {
    id: 'slide-1',
    title: 'fullstack',
    imageUrl:
      'https://cdn.21st.dev/assets/mirror/8c/8c0f960426250d158fbd13dcb4c244268f0847b8b3f2ae7788a62b9bcf6b7b02.jpg',
  },
  {
    id: 'slide-2',
    title: 'frontend dev',
    imageUrl:
      'https://cdn.21st.dev/assets/mirror/93/9309cec6a1caedbe56f26432bc56830785f7f06089f66190cfebcbe65e92789b.jpg',
  },
  {
    id: 'slide-3',
    title: 'backend dev',
    imageUrl:
      'https://cdn.21st.dev/assets/mirror/e5/e53e3c7473052546682df15ee99f20ccf6b5413039fc6cafa1b23717237091d0.jpg',
  },
  {
    id: 'slide-4',
    title: 'seo optimisation',
    imageUrl:
      'https://cdn.21st.dev/assets/mirror/64/64d1fa5c32ed1dc0c2ee577155618270fdff26e47f63c2fb4bc68c127d66d669.jpg',
  },
  {
    id: 'slide-5',
    title: 'ai engineer',
    imageUrl:
      'https://cdn.21st.dev/assets/mirror/48/4875e9daf51a4045c9f1e1f3e58885d32b7f28e04a5c1471c86c135f0b1c8cd2.jpg',
  },
]

export function ServicesSection() {
  return (
    <Section id="services">
      <SectionHeading eyebrow="Services" title="What I Build" />
      <motion.div variants={reveal} className="glass-panel rounded-3xl p-6 sm:p-10 md:p-12 overflow-hidden shadow-2xl">
        <HoverSlider className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 lg:gap-12">
            <div className="flex flex-col space-y-3 sm:space-y-4">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">
                Hover to explore
              </span>
              {SERVICES_SLIDES.map((slide, index) => (
                <TextStaggerHover
                  key={slide.title}
                  index={index}
                  className="cursor-pointer text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-foreground transition-colors hover:text-primary"
                  text={slide.title}
                />
              ))}
            </div>
            <div className="flex justify-center items-center">
              <HoverSliderImageWrap className="rounded-2xl overflow-hidden w-full max-w-md aspect-[4/3] shadow-2xl border border-primary/20">
                {SERVICES_SLIDES.map((slide, index) => (
                  <div key={slide.id} className="w-full h-full">
                    <HoverSliderImage
                      index={index}
                      imageUrl={slide.imageUrl}
                      src={slide.imageUrl}
                      alt={slide.title}
                      className="size-full object-cover"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                ))}
              </HoverSliderImageWrap>
            </div>
          </div>
        </HoverSlider>
      </motion.div>
    </Section>
  )
}

export function ProjectsSection() {
  return (
    <Section id="projects">
      <SectionHeading eyebrow="Projects" title="Things I've built" />
      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p) => {
          const cardContent = (
            <>
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="rounded-full bg-primary/15 px-2.5 py-1 text-xs font-medium text-primary ring-1 ring-primary/30">
                    {p.tag}
                  </span>
                  {p.link && (
                    <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground transition group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  )}
                </div>
                <h3 className="mt-3 sm:mt-4 text-lg sm:text-xl font-semibold text-foreground tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-2">
                <ul className="flex flex-wrap gap-1.5 sm:gap-2">
                  {p.stack.map((t) => (
                    <li
                      key={t}
                      className="rounded-full bg-white dark:bg-white/[0.08] px-2.5 py-1 text-[11px] sm:text-xs font-semibold text-slate-900 dark:text-purple-50 border border-purple-200/90 dark:border-white/20 shadow-xs select-none"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                {p.link && (
                  <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-primary transition group-hover:underline">
                    {p.link.includes('github.com') ? 'View Code' : 'Live Portal'}{' '}
                    <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  </span>
                )}
              </div>
            </>
          )

          return p.link ? (
            <motion.a
              key={p.title}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={reveal}
              className="glass-panel group flex flex-col justify-between rounded-2xl p-4 sm:p-6 transition hover:ring-primary/40 focus-visible:ring-2 focus-visible:ring-primary outline-none"
            >
              {cardContent}
            </motion.a>
          ) : (
            <motion.article
              key={p.title}
              variants={reveal}
              className="glass-panel group flex flex-col justify-between rounded-2xl p-4 sm:p-6 transition hover:ring-primary/40"
            >
              {cardContent}
            </motion.article>
          )
        })}
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
            <div className="grid gap-6 sm:gap-8 md:grid-cols-12 md:items-center">
              {/* Image Preview & Redirect */}
              <div className="relative md:col-span-5">
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
              <div className="flex flex-col gap-3.5 sm:gap-4 md:col-span-7">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="rounded-full bg-primary/15 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs font-semibold text-primary ring-1 ring-primary/30">
                    {pub.venue}
                  </span>
                  <span className="rounded-full bg-accent/15 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs font-medium text-accent ring-1 ring-accent/30">
                    IEEE Co-Sponsored
                  </span>
                  <span className="rounded-full bg-white dark:bg-white/[0.08] px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs font-semibold text-slate-900 dark:text-purple-50 border border-purple-200/90 dark:border-white/20 shadow-xs select-none">
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
                <div className="rounded-xl bg-white dark:bg-white/5 p-3 sm:p-3.5 border border-purple-200/90 dark:border-border/60 shadow-xs">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-primary">
                    Authors:
                  </span>
                  <p className="mt-1 text-xs leading-relaxed text-slate-900 dark:text-foreground/90 break-words">
                    {pub.authors.map((author, i) => (
                      <span key={author.name}>
                        <span
                          className={
                            author.isMe
                              ? 'font-bold text-primary underline underline-offset-2'
                              : 'font-semibold text-slate-800 dark:text-purple-100'
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
                      className="rounded-full bg-white dark:bg-white/[0.08] px-2.5 py-1 sm:px-3 sm:py-1 text-[11px] sm:text-xs font-semibold text-slate-900 dark:text-purple-50 border border-purple-200/90 dark:border-white/20 shadow-xs select-none"
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

export function VolunteeringSection() {
  return (
    <Section id="volunteering">
      <SectionHeading eyebrow="Volunteering" title="Giving back & speaking up" />
      <div className="flex flex-col gap-6 sm:gap-8">
        {VOLUNTEERING.map((v) => (
          <motion.article
            key={`${v.role}-${v.org}`}
            variants={reveal}
            className="glass-panel overflow-hidden rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 transition hover:ring-primary/40"
          >
            <div className="relative grid gap-6 sm:gap-8 md:grid-cols-12">
              {/* Role Details */}
              <div className="flex flex-col gap-3.5 sm:gap-4 md:col-span-5">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="rounded-full bg-primary/15 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs font-semibold text-primary ring-1 ring-primary/30">
                    {v.badge}
                  </span>
                  <span className="rounded-full bg-white dark:bg-white/[0.08] px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs font-semibold text-slate-900 dark:text-purple-50 border border-purple-200/90 dark:border-white/20 shadow-xs select-none">
                    {v.period}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 sm:h-12 sm:w-12 shrink-0 place-items-center rounded-xl sm:rounded-2xl bg-primary/15 ring-1 ring-primary/30">
                    <Mic className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </span>
                  <div>
                    <h3 className="text-lg xs:text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                      {v.role}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-primary">{v.org}</p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-foreground">{v.chapter}</p>

                <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  {v.summary}
                </p>

                {/* Highlights tags */}
                <ul className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                  {v.highlights.map((h) => (
                    <li
                      key={h}
                      className="rounded-full bg-white dark:bg-white/[0.08] px-2.5 py-1 sm:px-3 sm:py-1 text-[11px] sm:text-xs font-semibold text-slate-900 dark:text-purple-50 border border-purple-200/90 dark:border-white/20 shadow-xs select-none"
                    >
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Actions */}
                <div className="flex flex-col xs:flex-row flex-wrap items-stretch xs:items-center gap-2.5 sm:gap-3 pt-2">
                  {v.links.map((l, i) =>
                    i === 0 ? (
                      <a
                        key={l.label}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full xs:w-auto items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 sm:px-5 text-xs sm:text-sm font-semibold text-primary-foreground shadow-[0_0_20px_rgba(255,108,182,0.4)] transition hover:shadow-[0_0_28px_rgba(255,108,182,0.7)] outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[44px]"
                      >
                        {l.label}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <a
                        key={l.label}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full xs:w-auto items-center justify-center gap-2 rounded-full ring-1 ring-border px-4 py-2.5 sm:px-5 text-xs sm:text-sm font-medium text-foreground transition hover:bg-white/10 hover:text-primary outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[44px]"
                      >
                        <LinkIcon className="h-3.5 w-3.5" />
                        {l.label}
                      </a>
                    ),
                  )}
                </div>
              </div>

              {/* Events */}
              <div className="flex flex-col gap-3 sm:gap-4 md:col-span-7">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-primary">
                  {v.eventsLabel}
                </span>
                {v.events.map((ev) => (
                  <a
                    key={ev.title}
                    href={ev.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/ev rounded-xl bg-white dark:bg-white/5 p-3 sm:p-4 border border-purple-200/90 dark:border-border/60 shadow-xs transition hover:border-primary/50 outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {ev.images && (
                      <div className="mb-3 sm:mb-4 grid aspect-[9/4] grid-cols-3 grid-rows-2 gap-1.5 sm:gap-2">
                        {ev.images.map((img, i) => (
                          <div
                            key={img.src}
                            className={`relative overflow-hidden rounded-lg sm:rounded-xl border border-white/10 bg-black/20 ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
                          >
                            <Image
                              src={img.src}
                              alt={img.alt}
                              fill
                              className="object-cover transition-transform duration-500 group-hover/ev:scale-105"
                              sizes="(max-width: 768px) 66vw, 33vw"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        {ev.tag && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 text-[11px] sm:text-xs font-semibold text-primary-foreground">
                            <Mic className="h-3 w-3" />
                            {ev.tag}
                          </span>
                        )}
                        <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-[11px] sm:text-xs font-medium text-accent ring-1 ring-accent/30">
                          {ev.date}
                        </span>
                        <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-[11px] sm:text-xs font-medium text-primary ring-1 ring-primary/30">
                          {ev.format}
                        </span>
                      </div>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover/ev:text-primary group-hover/ev:-translate-y-0.5 group-hover/ev:translate-x-0.5" />
                    </div>
                    <h4 className="mt-2.5 text-sm sm:text-base font-semibold tracking-tight text-slate-900 dark:text-foreground break-words">
                      {ev.title}
                    </h4>
                    <p className="mt-1 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-muted-foreground">
                      {ev.desc}
                    </p>
                    <span className="mt-2.5 inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-primary transition group-hover/ev:underline">
                      {ev.link.includes('linkedin.com') ? 'View post on LinkedIn' : 'View event on GDG'}{' '}
                      <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    </span>
                  </a>
                ))}
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
          {/* X / Twitter */}
          <a
            href="https://x.com/_Soumika11"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="grid h-11 w-11 min-w-[44px] min-h-[44px] place-items-center rounded-full ring-1 ring-border transition hover:bg-white/10 hover:text-primary outline-none focus-visible:ring-2 focus-visible:ring-primary touch-manipulation"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 fill-current"
              aria-hidden
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
            </svg>
          </a>
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
