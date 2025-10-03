import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Login from '../pages/Auth/Login';

// Mock do react-toastify
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
  ToastContainer: () => null,
}));

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <AuthProvider>{component}</AuthProvider>
    </BrowserRouter>
  );
};

describe('Login Component', () => {
  it('deve renderizar o formulário de login', () => {
    renderWithProviders(<Login />);
    
    expect(screen.getByText('Sistema de Agendamento')).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('deve mostrar mensagem de erro para campos vazios', async () => {
    renderWithProviders(<Login />);
    
    const submitButton = screen.getByRole('button', { name: /entrar/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/e-mail é obrigatório/i)).toBeInTheDocument();
    });
  });

  it('deve mostrar credenciais de teste', () => {
    renderWithProviders(<Login />);
    
    expect(screen.getByText(/credenciais de teste/i)).toBeInTheDocument();
    expect(screen.getByText(/teste@teste.com/i)).toBeInTheDocument();
  });

  it('deve ter link para cadastro', () => {
    renderWithProviders(<Login />);
    
    const registerLink = screen.getByRole('link', { name: /cadastre-se/i });
    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveAttribute('href', '/register');
  });

  it('deve ter link para recuperar senha', () => {
    renderWithProviders(<Login />);
    
    const forgotPasswordLink = screen.getByRole('link', { name: /esqueceu a senha/i });
    expect(forgotPasswordLink).toBeInTheDocument();
    expect(forgotPasswordLink).toHaveAttribute('href', '/forgot-password');
  });
});

