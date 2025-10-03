import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { reportsAPI } from '../services/api';
import Layout from '../components/Layout';

const Dashboard = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = async () => {
    try {
      const data = await reportsAPI.getSummary();
      setSummary(data);
    } catch (error) {
      console.error('Erro ao carregar resumo:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </Layout>
    );
  }

  const cards = [
    {
      title: 'Total de Agendamentos',
      value: summary?.totalAppointments || 0,
      icon: '📅',
      color: 'bg-blue-500',
      roles: ['admin', 'professional', 'client'],
    },
    {
      title: 'Agendamentos Ativos',
      value: summary?.scheduledAppointments || 0,
      icon: '✅',
      color: 'bg-green-500',
      roles: ['admin', 'professional', 'client'],
    },
    {
      title: 'Agendamentos Concluídos',
      value: summary?.completedAppointments || 0,
      icon: '✔️',
      color: 'bg-purple-500',
      roles: ['admin', 'professional'],
    },
    {
      title: 'Agendamentos Cancelados',
      value: summary?.cancelledAppointments || 0,
      icon: '❌',
      color: 'bg-red-500',
      roles: ['admin', 'professional'],
    },
    {
      title: 'Total de Clientes',
      value: summary?.totalClients || 0,
      icon: '👥',
      color: 'bg-yellow-500',
      roles: ['admin', 'professional'],
    },
    {
      title: 'Total de Profissionais',
      value: summary?.totalProfessionals || 0,
      icon: '👨‍⚕️',
      color: 'bg-indigo-500',
      roles: ['admin'],
    },
    {
      title: 'Total de Serviços',
      value: summary?.totalServices || 0,
      icon: '🔧',
      color: 'bg-pink-500',
      roles: ['admin'],
    },
  ];

  const filteredCards = cards.filter(card =>
    card.roles.includes(user?.role)
  );

  const quickLinks = [
    {
      title: 'Ver Agenda',
      path: '/schedule',
      icon: '📅',
      description: 'Visualizar e gerenciar agendamentos',
      roles: ['admin', 'professional', 'client'],
    },
    {
      title: 'Novo Agendamento',
      path: '/schedule?action=new',
      icon: '➕',
      description: 'Criar novo agendamento',
      roles: ['admin', 'professional', 'client'],
    },
    {
      title: 'Gerenciar Clientes',
      path: '/clients',
      icon: '👥',
      description: 'Ver e cadastrar clientes',
      roles: ['admin', 'professional'],
    },
    {
      title: 'Relatórios',
      path: '/reports',
      icon: '📈',
      description: 'Visualizar relatórios detalhados',
      roles: ['admin', 'professional'],
    },
  ];

  const filteredLinks = quickLinks.filter(link =>
    link.roles.includes(user?.role)
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Bem-vindo, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-1">
            Visão geral do sistema de agendamento
          </p>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    {card.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">
                    {card.value}
                  </p>
                </div>
                <div className={`${card.color} text-white text-3xl p-3 rounded-full`}>
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ações Rápidas */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Ações Rápidas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg hover:scale-105 transition"
              >
                <div className="text-4xl mb-3">{link.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {link.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {link.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-primary-800 mb-2">
            💡 Dica do Sistema
          </h3>
          <p className="text-primary-700">
            {user?.role === 'admin' && 
              'Como administrador, você tem acesso total ao sistema. Use os relatórios para acompanhar o desempenho.'}
            {user?.role === 'professional' && 
              'Você pode visualizar sua agenda e gerenciar seus agendamentos. Mantenha seus horários atualizados!'}
            {user?.role === 'client' && 
              'Você pode agendar serviços e visualizar seus agendamentos. Entre em contato em caso de dúvidas.'}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

