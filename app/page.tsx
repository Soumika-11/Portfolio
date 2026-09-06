import { SceneProvider } from '@/components/portfolio/scene-context'
import { Navbar } from '@/components/portfolio/navbar'
import { Hero } from '@/components/portfolio/hero'
import { DiscoveryHints } from '@/components/portfolio/discovery-hints'
import {
  AboutSection,
  SkillsSection,
  ProjectsSection,
  ExperienceSection,
  ResumeSection,
  ContactSection,
  Footer,
} from '@/components/portfolio/sections'

export default function Page() {
  return (
    <SceneProvider>
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ResumeSection />
        <ContactSection />
      </main>
      <Footer />
      <DiscoveryHints />
    </SceneProvider>
  )
}
