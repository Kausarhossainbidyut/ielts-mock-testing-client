import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './Provider/AuthProvider.jsx';
import mainRoutes from './Routers/mainRoutes';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={mainRoutes} />
    </AuthProvider>
  );
}

export default App;