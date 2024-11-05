import { SectionPageCard } from '../components/SectionPageCard'

export function AdminHome () {
  return (
    <>
      <main className='w-full h-96 flex justify-center gap-5 p-5'>
        <SectionPageCard link='/usuarios' title='usuarios' img='https://colombia.unir.net/wp-content/uploads/sites/4/2023/06/disenouxcolombia5.jpg' />
        <SectionPageCard link='/preciosAdmin' title='precios' img='https://cdn.kambista.com/wp-content/uploads/2020/08/Imagen-1-1-e1597769103370.jpg' />
        <SectionPageCard link='/turnosAdmin' title='turnos' img='https://www.demandhub.co/assets/images/demandhub/articles/patient-appointment-scheduling/patient-appointment-scheduling-header.webp' />
      </main>
    </>
  )
}
