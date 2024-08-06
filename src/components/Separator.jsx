export function Separator ({ title, description }) {
  return (
    <div className='w-full h-44 flex flex-col justify-center items-center gap-4 text-center md:h-[50vh] md:max-h-[400px]'>
      <h3 className=' text-4xl md:text-6xl font-bold uppercase'>{title}</h3>
      <p className=' text-xl md:text-3xl text-gray-600'>{description}</p>
    </div>
  )
}
