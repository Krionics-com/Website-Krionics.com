import { useScrollReveal } from '../hooks/useScrollReveal'
import { Hero } from '../components/Hero/Hero'
import { Problem } from '../components/Problem/Problem'
import { Machine } from '../components/Machine/Machine'
import { Services } from '../components/Services/Services'
import { HowItWorks } from '../components/HowItWorks/HowItWorks'
import { MathComparison } from '../components/MathComparison/MathComparison'
import { ROICalculator } from '../components/ROICalculator/ROICalculator'
import { DashboardEmbed } from '../components/DashboardEmbed/DashboardEmbed'
import { Pricing } from '../components/Pricing/Pricing'
import { Manifesto } from '../components/Manifesto/Manifesto'
import { FAQ } from '../components/FAQ/FAQ'
import { FinalCTA } from '../components/FinalCTA/FinalCTA'
import { Footer } from '../components/Footer/Footer'

export function Home() {
  useScrollReveal()
  return (
    <>
      <Hero />
      <Problem />
      <Machine />
      <Services />
      <HowItWorks />
      <MathComparison />
      <ROICalculator />
      <DashboardEmbed />
      <Pricing />
      <Manifesto />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  )
}
