import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, AuthContext } from '../context/AuthContext';
import Dashboard from '../pages/Dashboard';

// Mock do react-toastify
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
  ToastContainer: () => null,
}));

// Mock da API
vi.mock('../services/api', () => ({
  reportsAPI: {
    getSummary: vi.fn(() => Promise.resolve({
      totalAppointments: 10,
      scheduledAppointments: 5,
      completedAppointments: 3,
      cancelledAppointments: 2,
      totalClients: 8,
      totalProfessionals: 4,
      totalServices: 6,
    })),
  },
}));

const mockUser = {
  id: 1,
  name: 'Teste Admin',
  email: 'teste@teste.com',
  role: 'admin',
};

const renderWithProviders = (component, user = mockUser) => {
  return render(
    <BrowserRouter>
      <AuthContext.Provider value={{ user, loading: false, isAuthenticated: true }}>
        {component}
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

describe('Dashboard Component', () => {
  it('deve renderizar o dashboard com boas-vindas', async () => {
    renderWithProviders(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.getByText(/bem-vindo, teste admin!/i)).toBeInTheDocument();
    });
  });

  it('deve exibir cards de resumo', async () => {
    renderWithProviders(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.getByText(/total de agendamentos/i)).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
    });
  });

  it('deve exibir ações rápidas para admin', async () => {
    renderWithProviders(<Dashboard />, mockUser);
    
    await waitFor(() => {
      expect(screen.getByText(/ações rápidas/i)).toBeInTheDocument();
      expect(screen.getByText(/ver agenda/i)).toBeInTheDocument();
    });
  });

  it('deve exibir dica específica para admin', async () => {
    renderWithProviders(<Dashboard />, mockUser);
    
    await waitFor(() => {
      expect(screen.getByText(/como administrador/i)).toBeInTheDocument();
    });
  });

  it('deve exibir dica específica para profissional', async () => {
    const professionalUser = { ...mockUser, role: 'professional' };
    renderWithProviders(<Dashboard />, professionalUser);
    
    await waitFor(() => {
      expect(screen.getByText(/você pode visualizar sua agenda/i)).toBeInTheDocument();
    });
  });

  it('deve exibir dica específica para cliente', async () => {
    const clientUser = { ...mockUser, role: 'client' };
    renderWithProviders(<Dashboard />, clientUser);
    
    await waitFor(() => {
      expect(screen.getByText(/você pode agendar serviços/i)).toBeInTheDocument();
    });
  });
});

