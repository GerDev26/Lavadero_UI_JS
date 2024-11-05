import { CheckCircleIcon, MinusCircleIcon, PencilIcon, PlusCircleIcon, TrashIcon, XCircleIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

export function Table ({ cols, children, tableName }) {
  const [isOpened, setIsOpened] = useState(true)

  const tBodyStyle = isOpened ? 'flex' : 'hidden'

  return (
    <div className='overflow-hidden'>
      <div
        className='flex bg-gray-950 w-full items-center justify-between px-2 md:justify-center cursor-pointer md:cursor-default mb-1'
        onClick={() => setIsOpened(!isOpened)}
      >
        <h1 className='text-2xl font-bold text-white text-center p-2'>{tableName}</h1>
        {
        isOpened
          ? <MinusCircleIcon className='w-8 h-8 text-white md:hidden' />
          : <PlusCircleIcon className='w-8 h-8 text-white md:hidden' />
        }
      </div>
      <table className='w-full h-fit md:text-center rounded-sm overflow-hidden'>
        <thead>
          <tr className='hidden md:table-row'>
            {
            cols.map((col, index) => <th key={index} className='py-3 uppercase bg-gray-800 text-white'>{col}</th>)
          }
          </tr>
        </thead>
        <tbody className={`flex-col gap-2 md:table-row-group overflow-hidden ${tBodyStyle}`}>
          {children}
        </tbody>
      </table>
    </div>
  )
}

export function TableRow ({ options = [], children }) {
  if (options.length > 0) {
    return (
      <tr className='grid grid-col-1 grid-flow-row md:table-row bg-gray-100 rounded-sm border-b-2 border-b-gray-300'>
        {children}

        <td className='row-start-1 py-4 flex justify-between items-center md:justify-center bg-gray-700 md:bg-transparent p-3'>
          <span className='md:hidden font-bold text-xl text-white'>Opciones</span>
          <div className='flex gap-1'>
            {options.map(option => option)}
          </div>
        </td>

      </tr>
    )
  }

  return (
    <tr className='grid grid-col-1 grid-flow-row md:table-row bg-gray-100 rounded-sm border-b-2 border-b-gray-300'>
      {children}
    </tr>
  )
}
export function DeleteOption ({ deleteCallback }) {
  return (
    <div className='p-1 bg-red-100 rounded-md active:scale-95 hover:scale-105 '>
      <TrashIcon onClick={deleteCallback} className='text-red-700 drop-shadow-lg m-auto w-6 cursor-pointer' />
    </div>
  )
}
export function UpdateOption ({ updateCallback }) {
  return (
    <div className='p-1 bg-yellow-100 rounded-md active:scale-95 hover:scale-105'>
      <PencilIcon onClick={updateCallback} className='text-yellow-600 drop-shadow-lg m-auto w-6 cursor-pointer' />
    </div>
  )
}

export function ReleaseOption ({ releaseCallback }) {
  return (
    <div className='p-1 bg-red-100 rounded-md active:scale-95 hover:scale-105'>
      <XCircleIcon onClick={releaseCallback} className='text-red-700 drop-shadow-lg m-auto w-6 h-6 cursor-pointer' />
    </div>
  )
}
export function CompleteOption ({ completeCallback }) {
  return (
    <div className='p-1 bg-green-100 rounded-md active:scale-95 hover:scale-105'>
      <CheckCircleIcon onClick={completeCallback} className='text-green-600 drop-shadow-lg m-auto w-6 cursor-pointer' />
    </div>
  )
}

export function TableRowItem ({ col, children, normal }) {
  return (
    <td className='flex gap-2 md:table-cell p-3'>
      <span className='md:hidden'>{col}</span>
      <p className={`font-bold md:font-normal ${normal ? '' : 'capitalize'}`}>{children}</p>
    </td>
  )
}

export function SkeletonRows ({ cols = [], tableName = 'Cargando...' }) {
  return (
    <Table cols={cols} tableName={tableName}>
      <tr>
        <td colSpan={cols.length + 1} rowSpan={cols.length - 1} className='w-screen md:w-full h-72 bg-gray-900 animate-skeletonLoading text-transparent text-2xl'>
          Cargando...
        </td>
      </tr>
    </Table>
  )
}

export function EmptyTable ({ cols, tableName, message = 'No hay turnos disponibles' }) {
  return (
    <Table cols={cols} tableName={tableName}>
      <tr>
        <td colSpan={cols.length + 1} rowSpan={5} className='w-screen md:w-full text-center h-20 text-xl'>
          {message}
        </td>
      </tr>
    </Table>
  )
}
