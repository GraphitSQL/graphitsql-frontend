import { RouterProvider } from 'react-router';
import { routers } from './common/routes';
import { GlobalStyle } from './styles/global.styles';
import { Toaster } from './common/components/ui/toaster';

function App() {
  return (
    <>
      <GlobalStyle />
      <Toaster />
      <RouterProvider router={routers} />
    </>
  );
}

export default App;
