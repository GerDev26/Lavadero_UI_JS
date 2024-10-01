import { Banner } from '../components/Presentation'
import { Separator } from '../components/Separator'
import { Services } from '../components/Home/Services'

export function ClientHome () {
  return (
    <div className='flex flex-col gap-4'>
      <Banner />
      <Separator title='Nuestros servicios' description='Te ofrecemos servicios de la mejor calidad' />
      <Services />
    </div>
  )
}
