import { useState } from 'react';
import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import Swal from 'sweetalert2';
import useApi from '../hooks/useBranchbitApi';
import { Datum, WithdrawResponse } from '../interfaces/withdrawResponse/WithdrawResponse';

interface WithdrawProps {
  onReload: () => void;
}

const Withdraw: React.FC<WithdrawProps> = ({ onReload }) => {
  const [amount, setAmount] = useState(0);
  const { data, loading, error, fetchData } = useApi<WithdrawResponse>(
    'http://127.0.0.1:8080/api/v1/cash/withdraw',
    'post'
  );

  const handleWithdraw = async () => {
    await fetchData({ amount });
    if (!error) {
      onReload();
    } else {
      Swal.fire({
        icon: 'error',
        title: error,
      });
    }
  };

  return (
    <div>
      <div className='flex justify-center items-end gap-4'>
        <Input
          type='number'
          placeholder='0.00'
          labelPlacement='outside'
          startContent={
            <div className='pointer-events-none flex items-center'>
              <span className='text-default-400 text-small'>$</span>
            </div>
          }
          value={amount.toString()}
          onChange={e => setAmount(Number(e.target.value))}
        />
        <Button color='primary' onClick={handleWithdraw} disabled={loading}>
          {loading ? 'Retirando...' : 'Retirar'}
        </Button>
      </div>

      {data && (
        <div className='mt-8'>
          <h2 className='text-xl font-bold mb-4'>Resultado del retiro:</h2>
          <Table aria-label='Withdraw result table'>
            <TableHeader>
              <TableColumn>Tipo</TableColumn>
              <TableColumn>Cantidad</TableColumn>
              <TableColumn>Valor</TableColumn>
              <TableColumn>Valor Total</TableColumn>
            </TableHeader>
            <TableBody items={data?.data || []}>
              {(item: Datum) => (
                <TableRow key={item.value}>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.value}</TableCell>
                  <TableCell>{item.totalValue}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Withdraw;
