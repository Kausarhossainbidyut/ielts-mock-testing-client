import { RouterProvider } from 'react-router-dom';
import AuthProvider from './Provider/AuthProvider';
import mainRoutes from './Routers/mainRoutes';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={mainRoutes} />
    </AuthProvider>
  );
}

export default App;