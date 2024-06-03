import { useState } from 'react';
import CashEntities from '../components/CashEntities';
import Withdraw from '../components/Withdraw';
import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react';

export default function Home() {
  const [reload, setReload] = useState(false);

  const handleReload = () => {
    setReload(prevReload => !prevReload);
  };

  return (
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
  );
}
