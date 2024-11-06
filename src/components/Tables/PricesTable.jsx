import { useContext, useEffect } from 'react'
import { usePrices } from '../../hooks/usePrices'
import { Table, TableRow, TableRowItem, SkeletonRows, EmptyTable, UpdateOption } from './BaseTable'
import { InputContext } from '../../context/InputContext'
import { PricesContext } from '../../context/PricesContext'
import { ModalContext } from '../../context/ModalContext'

export function EmployPricesTable ({ tableName = 'Precios' }) {
  const { fields } = useContext(InputContext)
  const { setPrices, prices } = useContext(PricesContext)
  const { data, loading, error } = usePrices({ vehicleType: fields.vehicleType === 'Opcion' ? '' : fields.vehicleType, service: fields.service === 'Opcion' ? '' : fields.service })
  const cols = ['Valor', 'Servicio', 'Tipo']

  useEffect(() => {
    if (!loading && data) {
      setPrices(data)
    }
  }, [data, loading])

  if (loading) {
    return <SkeletonRows />
  }

  if (error) {
    return <p>Error al cargar los precios</p>
  }
  if (prices) {
    return prices.length > 0
      ? (
        <Table cols={cols} tableName={tableName}>
          {prices.map((price) => (
            <TableRow
              key={price.id}
            >
              <TableRowItem col={cols[0]}>${price.value}</TableRowItem>
              <TableRowItem col={cols[1]}>{price.service}</TableRowItem>
              <TableRowItem col={cols[2]}>{price.vehicleType}</TableRowItem>
            </TableRow>
          ))}
        </Table>
        )
      : (
        <EmptyTable cols={cols} tableName={tableName} message='No hay precios disponibles' />
        )
  }
}
export function AdminPricesTable ({ tableName = 'Precios' }) {
  const { fields } = useContext(InputContext)
  const { setUpdateModal, setUpdateValues } = useContext(ModalContext)
  const { setPrices, prices } = useContext(PricesContext)
  const { data, loading, error } = usePrices({ vehicleType: fields.vehicleType === 'Opcion' ? '' : fields.vehicleType, service: fields.service === 'Opcion' ? '' : fields.service })
  const cols = ['Valor', 'Servicio', 'Tipo', 'Opcion']

  const handleUpdate = (price) => {
    setUpdateValues(price)
    setUpdateModal(true)
  }
  useEffect(() => {
    if (!loading && data) {
      setPrices(data)
    }
  }, [data, loading])

  if (loading) {
    return <SkeletonRows />
  }

  if (error) {
    return <p>Error al cargar los precios</p>
  }
  if (prices) {
    return prices.length > 0
      ? (
        <Table cols={cols} tableName={tableName}>
          {prices.map((price, index) => (
            <TableRow
              key={price.id}
              options={[
                <UpdateOption key={index} updateCallback={() => handleUpdate(price)} />
              ]}
            >
              <TableRowItem col={cols[0]}>${price.value}</TableRowItem>
              <TableRowItem col={cols[1]}>{price.service}</TableRowItem>
              <TableRowItem col={cols[2]}>{price.vehicleType}</TableRowItem>
            </TableRow>
          ))}
        </Table>
        )
      : (
        <EmptyTable cols={cols} tableName={tableName} message='No hay precios disponibles' />
        )
  }
}
