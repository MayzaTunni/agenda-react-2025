import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Professionals from '../pages/Professionals';

// Mock do react-toastify
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
  ToastContainer: () => null,
}));

// Mock da API
const mockProfessionals = [
  {
    id: 1,
    name: 'Dr. João Silva',
    email: 'joao@exemplo.com',
    specialty: 'Clínico Geral',
    phone: '(11) 98765-4321',
    active: true,
  },
];

vi.mock('../services/api', () => ({
  professionalsAPI: {
    getAll: vi.fn(() => Promise.resolve(mockProfessionals)),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

const mockUser = {
  id: 1,
  name: 'Teste Admin',
  email: 'teste@teste.com',
  role: 'admin',
};

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <AuthContext.Provider value={{ user: mockUser, loading: false, isAuthenticated: true }}>
        {component}
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

describe('Professionals Component', () => {
  it('deve renderizar a página de profissionais', async () => {
    renderWithProviders(<Professionals />);
    
    await waitFor(() => {
      expect(screen.getByText('Profissionais')).toBeInTheDocument();
    });
  });

  it('deve exibir botão de novo profissional', async () => {
    renderWithProviders(<Professionals />);
    
    await waitFor(() => {
      expect(screen.getByText('+ Novo Profissional')).toBeInTheDocument();
    });
  });

  it('deve listar profissionais cadastrados', async () => {
    renderWithProviders(<Professionals />);
    
    await waitFor(() => {
      expect(screen.getByText('Dr. João Silva')).toBeInTheDocument();
      expect(screen.getByText('joao@exemplo.com')).toBeInTheDocument();
      expect(screen.getByText('Clínico Geral')).toBeInTheDocument();
    });
  });

  it('deve abrir modal ao clicar em novo profissional', async () => {
    renderWithProviders(<Professionals />);
    
    await waitFor(() => {
      const newButton = screen.getByText('+ Novo Profissional');
      fireEvent.click(newButton);
    });

    await waitFor(() => {
      expect(screen.getByText('Novo Profissional')).toBeInTheDocument();
    });
  });

  it('deve ter campos obrigatórios no formulário', async () => {
    renderWithProviders(<Professionals />);
    
    await waitFor(() => {
      const newButton = screen.getByText('+ Novo Profissional');
      fireEvent.click(newButton);
    });

    await waitFor(() => {
      expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/especialidade/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/telefone/i)).toBeInTheDocument();
    });
  });
});

