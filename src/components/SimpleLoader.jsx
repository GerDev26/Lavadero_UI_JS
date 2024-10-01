export function SimpleLoader () {
  return (
    <div className='w-16 h-16 border-b-4 animate-spin rounded-full border-red-600' />
  )
}

export function FullScreenSimpleLoader () {
  return (
    <main className='w-full h-screen flex justify-center items-center'>
      <SimpleLoader />
    </main>
  )
}
