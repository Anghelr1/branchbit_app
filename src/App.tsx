import { NextUIProvider } from '@nextui-org/react';
import Home from './layouts/Home';

function App() {
  return (
    <NextUIProvider>
      <Home />
    </NextUIProvider>
  );
}

export default App;
