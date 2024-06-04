import { useState, useEffect } from 'react';
import CashEntities from '../components/CashEntities';
import Withdraw from '../components/Withdraw';
import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import useApi from '../hooks/useBranchbitApi';

interface CashTotalResponse {
  status: string;
  statusCode: number;
  message: string;
  dataCount: number;
  data: number;
}

export default function Home() {
  const [reload, setReload] = useState(false);
  const {
    data: cashTotal,
    loading,
    error,
    fetchData,
  } = useApi<CashTotalResponse>('http://127.0.0.1:8080/api/v1/cash/total');

  useEffect(() => {
    fetchData();
  }, [reload]);

  const handleReload = () => {
    setReload(prevReload => !prevReload);
  };

  return (
    <div className='flex flex-col justify-center items-center h-100vh'>
      <div className='flex justify-center mt-8'>
        <h1>Saldo actual disponible</h1>
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p>Error al obtener el saldo</p>
        ) : (
          <h2 className='text-4xl font-bold'>${cashTotal?.data}</h2>
        )}
      </div>
      <div className='flex justify-center gap-4 mt-8'>
        <div>
          <Card>
            <CardHeader className='flex justify-center font-bold'>
              <h1>Efectivo disponible</h1>
            </CardHeader>
            <Divider />
            <CardBody>
              <CashEntities reload={reload} />
            </CardBody>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader className='flex justify-center items-center'>
              <h1 className='text-center mb-5'>Retirar efectivo</h1>
            </CardHeader>
            <Divider />
            <CardBody>
              <Withdraw onReload={handleReload} />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
