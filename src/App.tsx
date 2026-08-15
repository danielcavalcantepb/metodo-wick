import { Header } from './components/layout/Header'
import { HeroFullBleed } from './sections/HeroFullBleed/HeroFullBleed'
import { MethodIntroduction } from './sections/MethodIntroduction/MethodIntroduction'
import { MethodMechanismIntro } from './sections/MethodMechanismIntro/MethodMechanismIntro'
import { ValuePerception } from './sections/ValuePerception/ValuePerception'
import { Transformation } from './sections/Transformation/Transformation'
import { PracticeAuthority } from './sections/PracticeAuthority/PracticeAuthority'
import { Audience } from './sections/Audience/Audience'
import { Curriculum } from './sections/Curriculum/Curriculum'
import { Offer } from './sections/Offer/Offer'
import { Manifesto } from './sections/Manifesto/Manifesto'
import { Faq } from './sections/Faq/Faq'
import { FinalCta } from './sections/FinalCta/FinalCta'
import { Footer } from './components/layout/Footer'
import { WickSymbolStudy } from './studies/WickSymbolStudy/WickSymbolStudy'
import styles from './App.module.css'

function App() {
  if (window.location.pathname === '/estudo-simbolo') {
    return <WickSymbolStudy />
  }

  return (
    <>
      <a className="skip-link" href="#top">Pular para o conteúdo</a>
      <Header />
      <main id="top" tabIndex={-1} className={styles.blueprintOpening}>
        <HeroFullBleed />
        <MethodIntroduction />
        <ValuePerception />
        <MethodMechanismIntro />
        <Transformation />
        <PracticeAuthority />
        <Audience />
        <Curriculum />
        <Offer />
        <Manifesto />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}

export default App
