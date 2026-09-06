import { SceneProvider } from '@/components/portfolio/scene-context'
import { Navbar } from '@/components/portfolio/navbar'
import { Hero } from '@/components/portfolio/hero'
import { DiscoveryHints } from '@/components/portfolio/discovery-hints'
import { Particles } from '@/components/portfolio/particles'
import {
  AboutSection,
  SkillsSection,
  ProjectsSection,
  PublicationsSection,
  ExperienceSection,
  ResumeSection,
  ContactSection,
  Footer,
} from '@/components/portfolio/sections'

export default function Page() {
  return (
    <SceneProvider>
      <Particles count={40} />
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <PublicationsSection />
        <ExperienceSection />
        <ResumeSection />
        <ContactSection />
      </main>
      <Footer />
      <DiscoveryHints />
    </SceneProvider>
  )
}
