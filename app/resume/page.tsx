import type { Metadata } from 'next'
import { ResumeRedirect } from '@/components/portfolio/resume-redirect'

// Shareable resume link (e.g. LinkedIn Featured). public/resume.pdf and
// public/resume-preview.png are kept up to date by the SoumikaCV repo's
// sync workflow, so this page never needs editing when the CV changes.
const SITE = 'https://www.soumika.dev'
const PDF = '/resume.pdf'
const PREVIEW = `${SITE}/resume-preview.png`
const TITLE = 'Soumika Das - Resume'
const DESCRIPTION =
  'Software Engineer | Full-Stack & Backend Development | AI/ML. Always the latest version of my CV.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE}/resume` },
  openGraph: {
    type: 'website',
    url: `${SITE}/resume`,
    siteName: 'Soumika.dev',
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: PREVIEW, width: 1200, height: 630, alt: 'First page of Soumika Das’s resume' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [PREVIEW],
  },
}

export default function ResumePage() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center gap-4 px-4 text-center">
      <ResumeRedirect href={PDF} />
      <p className="text-muted-foreground">Opening my resume…</p>
      <a href={PDF} className="font-medium text-primary underline underline-offset-4">
        Open the PDF
      </a>
    </main>
  )
}
