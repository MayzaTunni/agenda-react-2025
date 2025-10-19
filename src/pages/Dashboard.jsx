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
      title: 'Agendamentos Hoje',
      value: summary?.todayAppointments || 0,
      icon: '💇‍♀️',
      color: 'bg-primary-500',
      roles: ['admin', 'professional', 'client'],
    },
    {
      title: 'Próximos Horários',
      value: summary?.upcomingAppointments || 0,
      icon: '⏰',
      color: 'bg-secondary-500',
      roles: ['admin', 'professional', 'client'],
    },
    {
      title: 'Clientes Fidelizados',
      value: summary?.loyalClients || 0,
      icon: '👑',
      color: 'bg-yellow-500',
      roles: ['admin', 'professional'],
    },
    {
      title: 'Avaliações 5 Estrelas',
      value: summary?.fiveStarReviews || 0,
      icon: '⭐',
      color: 'bg-yellow-400',
      roles: ['admin', 'professional'],
    },
    {
      title: 'Procedimentos Realizados',
      value: summary?.completedServices || 0,
      icon: '✨',
      color: 'bg-primary-400',
      roles: ['admin', 'professional'],
    },
    {
      title: 'Produtos Vendidos',
      value: summary?.productsSold || 0,
      icon: '🛍️',
      color: 'bg-secondary-400',
      roles: ['admin'],
    },
    {
      title: 'Novos Clientes',
      value: summary?.newClients || 0,
      icon: '🎉',
      color: 'bg-green-500',
      roles: ['admin', 'professional'],
    },
    {
      title: 'Serviços Populares',
      value: summary?.popularServices || 0,
      icon: '💅',
      color: 'bg-pink-500',
      roles: ['admin'],
    },
  ];

  const filteredCards = cards.filter((card) => card.roles.includes(user?.role));

  const quickLinks = [
    {
      title: 'Agendar Horário',
      path: '/schedule',
      description: 'Marque um novo horário para atendimento',
      icon: '📅',
      roles: ['admin', 'professional', 'client'],
    },
    {
      title: 'Catálogo de Serviços',
      path: '/services',
      description: 'Explore nossos serviços e tratamentos',
      icon: '💆‍♀️',
      roles: ['admin', 'professional', 'client'],
    },
    {
      title: 'Gestão de Clientes',
      path: '/clients',
      description: 'Gerencie sua carteira de clientes',
      icon: '👥',
      roles: ['admin', 'professional'],
    },
    {
      title: 'Controle de Estoque',
      path: '/inventory',
      description: 'Gerencie produtos e materiais',
      icon: '📦',
      roles: ['admin'],
    },
    {
      title: 'Avaliações e Feedback',
      path: '/reviews',
      description: 'Veja o feedback dos clientes',
      icon: '⭐',
      roles: ['admin', 'professional'],
    },
    {
      title: 'Promoções Ativas',
      path: '/promotions',
      description: 'Gerencie ofertas e descontos',
      icon: '🏷️',
      roles: ['admin'],
    },
    {
      title: 'Meus Agendamentos',
      path: '/my-appointments',
      description: 'Veja seus horários marcados',
      icon: '📋',
      roles: ['client'],
    },
    {
      title: 'Fidelidade',
      path: '/loyalty',
      description: 'Programa de pontos e benefícios',
      icon: '🎁',
      roles: ['client'],
    },
  ];

  const filteredLinks = quickLinks.filter((link) =>
    link.roles.includes(user?.role)
  );

  return (
    <Layout>
      <div className="space-y-6 p-6 bg-gradient-to-br from-pink-50 via-white to-pink-50 animate-fadeIn">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            Bem-vindo, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Visão geral do salão de beleza
          </p>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCards.map((card, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border border-pink-100 animate-slideInFromLeft"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-600 text-sm font-medium uppercase tracking-wider">
                    {card.title}
                  </p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mt-2">
                    {card.value}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white text-3xl p-4 rounded-2xl shadow-lg">
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ações Rápidas */}
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-6">
            Ações Rápidas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="group bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border border-pink-100 relative overflow-hidden animate-slideInFromRight"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-500/0 to-secondary-500/0 group-hover:from-primary-500/10 group-hover:to-secondary-500/10 transition-all duration-300"></div>
                <div className="relative z-10">
                  <div className="text-4xl mb-4 bg-gradient-to-br from-primary-500 to-secondary-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    {link.icon}
                  </div>
                  <h3 className="text-lg font-semibold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2">
                    {link.title}
                  </h3>
                  <p className="text-sm text-gray-600">{link.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-200/50 rounded-xl p-8 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-2xl shadow-lg">
              💡
            </div>
            <h3 className="text-xl font-semibold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Dica do Sistema
            </h3>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed">
            {user?.role === 'admin' &&
              'Como proprietária, você tem acesso total ao sistema. Use os relatórios para acompanhar o desempenho do salão.'}
            {user?.role === 'professional' &&
              'Você pode visualizar sua agenda e gerenciar seus agendamentos. Mantenha seus horários atualizados para atender suas clientes!'}
            {user?.role === 'client' &&
              'Você pode agendar tratamentos e visualizar seus agendamentos. Cuide da sua beleza com praticidade!'}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
