import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'
import { Banner } from '../components/Presentation'
import { Separator } from '../components/Separator'
import { Services } from '../components/Home/Services'

export function Home () {
  return (
    <div className='flex flex-col gap-4'>

      <Navbar />
      <Banner />
      <Separator title='Nuestros servicios' description='Te ofrecemos servicios de la mejor calidad' />
      <Services />
      <Footer />
    </div>
  )
}
