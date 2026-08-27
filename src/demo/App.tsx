import { FC } from 'react'
import imageBackground from '/background.jpg'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Showcase from './components/Showcase'
import Playground from './components/Playground'
import PropsTable from './components/PropsTable'
import Install from './components/Install'
import Footer from './components/Footer'

const BackgroundLayers: FC = () => (
  <>
    <div className="fixed inset-0 -z-30 bg-(--color-void)" />
    <div className="bg-mesh fixed inset-0 -z-20 opacity-60" />
    <img
      src={imageBackground}
      alt=""
      className="fixed inset-0 -z-25 h-screen w-full object-cover opacity-20 mix-blend-luminosity"
    />
    <div
      className="blob fixed top-[20%] left-[10%] -z-15 h-125 w-125 bg-(--color-electric-purple)"
      style={{ animationDelay: '0s' }}
    />
    <div
      className="blob fixed top-[60%] right-[15%] -z-15 h-100 w-100 bg-(--color-electric-blue)"
      style={{ animationDelay: '5s' }}
    />
    <div
      className="blob fixed bottom-[10%] left-[50%] -z-15 h-87.5 w-87.5 bg-(--color-indigo-deep)"
      style={{ animationDelay: '10s' }}
    />
  </>
)

const App: FC = () => (
  <div className="font-body relative min-h-screen overflow-hidden">
    <BackgroundLayers />
    <Navbar />
    <main className="relative">
      <Hero />
      <div className="hairline mx-auto max-w-4xl" />
      <Features />
      <Showcase />
      <Playground />
      <PropsTable />
      <Install />
    </main>
    <Footer />
  </div>
)

export default App
