import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);

  // Carregar usuário do localStorage ao iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const blockedUntil = localStorage.getItem('blockedUntil');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (blockedUntil) {
      const blockedTime = new Date(blockedUntil);
      if (blockedTime > new Date()) {
        setIsBlocked(true);
        // Desbloquear após o tempo expirar
        const timeout = setTimeout(() => {
          setIsBlocked(false);
          localStorage.removeItem('blockedUntil');
          setLoginAttempts(0);
        }, blockedTime - new Date());
        
        return () => clearTimeout(timeout);
      } else {
        localStorage.removeItem('blockedUntil');
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    if (isBlocked) {
      throw new Error('Conta bloqueada. Tente novamente mais tarde.');
    }

    // Simular chamada de API
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = storedUsers.find(
      (u) => u.email === email && u.password === password
    );

    // Usuário padrão para teste
    if (email === 'teste@teste.com' && password === '123456') {
      const defaultUser = {
        id: 1,
        name: 'Usuário Teste',
        email: 'teste@teste.com',
        role: 'admin', // admin, professional, client
      };
      
      setUser(defaultUser);
      localStorage.setItem('user', JSON.stringify(defaultUser));
      setLoginAttempts(0);
      return defaultUser;
    }

    if (foundUser) {
      const userData = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setLoginAttempts(0);
      return userData;
    }

    // Incrementar tentativas de login
    const newAttempts = loginAttempts + 1;
    setLoginAttempts(newAttempts);

    if (newAttempts >= 5) {
      setIsBlocked(true);
      const blockedUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos
      localStorage.setItem('blockedUntil', blockedUntil.toISOString());
      throw new Error('Conta bloqueada por 15 minutos após 5 tentativas inválidas.');
    }

    throw new Error(`Credenciais inválidas. Tentativa ${newAttempts} de 5.`);
  };

  const register = async (userData) => {
    // Simular registro
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Verificar se e-mail já existe
    const emailExists = storedUsers.some((u) => u.email === userData.email);
    if (emailExists) {
      throw new Error('E-mail já cadastrado.');
    }

    const newUser = {
      id: Date.now(),
      ...userData,
      role: userData.role || 'client',
    };

    storedUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(storedUsers));

    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const hasPermission = (requiredRole) => {
    if (!user) return false;

    const roleHierarchy = {
      admin: 3,
      professional: 2,
      client: 1,
    };

    return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isBlocked,
        loginAttempts,
        login,
        logout,
        register,
        hasPermission,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

