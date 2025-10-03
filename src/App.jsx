import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

// Auth Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';

// Internal Pages
import Dashboard from './pages/Dashboard';
import Professionals from './pages/Professionals';
import Clients from './pages/Clients';
import Services from './pages/Services';
import Schedule from './pages/Schedule';
import Reports from './pages/Reports';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Rota raiz redireciona para login */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Rotas Públicas (Autenticação) */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Rotas Privadas (Área Interna) */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            <Route
              path="/professionals"
              element={
                <PrivateRoute requiredRole="admin">
                  <Professionals />
                </PrivateRoute>
              }
            />

            <Route
              path="/clients"
              element={
                <PrivateRoute requiredRole="professional">
                  <Clients />
                </PrivateRoute>
              }
            />

            <Route
              path="/services"
              element={
                <PrivateRoute requiredRole="admin">
                  <Services />
                </PrivateRoute>
              }
            />

            <Route
              path="/schedule"
              element={
                <PrivateRoute>
                  <Schedule />
                </PrivateRoute>
              }
            />

            <Route
              path="/reports"
              element={
                <PrivateRoute requiredRole="professional">
                  <Reports />
                </PrivateRoute>
              }
            />

            {/* Rota 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* Toast Container para notificações */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
