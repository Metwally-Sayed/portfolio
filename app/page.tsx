import { Header } from '@/components/header'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Offers } from '@/components/sections/offers'
import { Experience } from '@/components/sections/experience'
import { Projects } from '@/components/sections/projects'
import { Skills } from '@/components/sections/skills'
import { Contact } from '@/components/sections/contact'

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Offers />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  )
}
