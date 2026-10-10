'use client'

import { useEffect } from 'react'

// Sends visitors straight on to the PDF. Link-preview crawlers (LinkedIn,
// Slack, etc.) don't run JavaScript, so they stay on /resume and read its
// Open Graph tags instead.
export function ResumeRedirect({ href }: { href: string }) {
  useEffect(() => {
    window.location.replace(href)
  }, [href])

  return null
}
