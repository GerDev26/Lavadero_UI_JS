import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'
import { SectionPageCard } from '../components/SectionPageCard'

export function EmployHome () {
  return (
    <>
      <Navbar />
      <main className='w-full h-96 flex justify-center gap-5 p-5'>
        <SectionPageCard title='precios' img='https://cdn.kambista.com/wp-content/uploads/2020/08/Imagen-1-1-e1597769103370.jpg' />
        <SectionPageCard link='turnos' title='turnos' img='https://www.demandhub.co/assets/images/demandhub/articles/patient-appointment-scheduling/patient-appointment-scheduling-header.webp' />
      </main>
      <Footer />
    </>
  )
}
