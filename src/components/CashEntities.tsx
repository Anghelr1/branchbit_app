import React, { useEffect } from 'react';
import useApi from '../hooks/useBranchbitApi';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { CashEntitiesResponse, Datum } from '../interfaces';

interface CashEntitiesProps {
  reload: boolean;
}

const CashEntities: React.FC<CashEntitiesProps> = ({ reload }) => {
  const {
    data: cashEntities,
    loading,
    error,
    fetchData,
  } = useApi<CashEntitiesResponse>('http://127.0.0.1:8080/api/v1/cash');

  useEffect(() => {
    fetchData();
  }, [reload]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='w-full'>
      <Table aria-label='Example static collection table'>
        <TableHeader>
          <TableColumn>Tipo</TableColumn>
          <TableColumn>Cantidad</TableColumn>
          <TableColumn>Denominación</TableColumn>
        </TableHeader>
        <TableBody items={cashEntities?.data || []}>
          {(item: Datum) => (
            <TableRow key={item.value}>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.value}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CashEntities;
