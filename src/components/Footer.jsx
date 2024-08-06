import { SocialIcon } from 'react-social-icons'

export function Footer () {
  return (
    <footer className='w-full h-96 flex flex-col justify-center items-center text-white bg-black'>
      <h3 className='text-2xl md:text-4xl font-semithird uppercase mb-10'> Nuestras redes sociales </h3>
      <div className='w-full flex justify-center items-center'>
        <div className='absolute m-auto w-full h-1 bg-white' />
        <div className='relative z-10 flex gap-4 m-auto bg-black px-4'>
          <SocialIcon className='transition-all hover:scale-110' url='www.whatsapp.com' />
          <SocialIcon className='transition-all hover:scale-110' url='www.facebook.com' />
          <SocialIcon className='transition-all hover:scale-110' url='www.instagram.com' />
          <SocialIcon className='transition-all hover:scale-110' url='www.x.com' />
        </div>
      </div>

      <div className='flex gap-4 mt-6 text-l md:text-2xl'>
        <p>Todos los derechos reservados:</p>
        <p>RFcarwash</p>
      </div>
    </footer>
  )
}
