import { usePrices } from '../../hooks/usePrices'
import { Table, TableRow, TableRowItem } from './BaseTable'

export function EmployPricesTable ({ vehicleType, service, tableName = 'Precios' }) {
  const prices = usePrices({ vehicleType, service })
  const cols = ['Valor', 'Servicio', 'Tipo']
  return (
    <Table cols={cols} tableName={tableName}>
      {
            prices.length > 0
              ? prices.map((price) => (
                <TableRow
                  key={price.id}
                >
                  <TableRowItem col={cols[0]}>${price.value}</TableRowItem>
                  <TableRowItem col={cols[1]}>{price.service}</TableRowItem>
                  <TableRowItem col={cols[2]}>{price.vehicleType}</TableRowItem>
                </TableRow>
              ))
              : (
                <tr>
                  <td colSpan={cols.length + 1} rowSpan={5} className='w-screen md:w-full h-72 bg-gray-900 animate-skeletonLoading text-transparent'>
                    Cargando...
                  </td>
                </tr>
                )
            }
    </Table>
  )
}
