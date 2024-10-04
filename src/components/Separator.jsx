export function Separator ({ title, description }) {
  return (
    <div className='w-full min-h-40 flex flex-col justify-center items-center gap-2 p-2 text-center md:h-[50vh] md:max-h-[400px]'>
      <h3 className='text-nowrap text-3xl md:text-6xl font-bold uppercase'>{title}</h3>
      <p className=' text-xl md:text-2xl text-gray-600'>{description}</p>
    </div>
  )
}
