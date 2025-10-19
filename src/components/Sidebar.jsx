import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    // {
    //   name: 'Dashboard',
    //   path: '/dashboard',
    //   icon: '💄',
    //   roles: ['admin', 'professional', 'client'],
    // },
    // {
    //   name: 'Profissionais',
    //   path: '/professionals',
    //   icon: '💇‍♀️',
    //   roles: ['admin'],
    // },
    // {
    //   name: 'Clientes',
    //   path: '/clients',
    //   icon: '👥',
    //   roles: ['admin', 'professional'],
    // },
    {
      name: 'Serviços',
      path: '/services',
      icon: '✨',
      roles: ['admin'],
    },
    // {
    //   name: 'Agenda',
    //   path: '/schedule',
    //   icon: '📅',
    //   roles: ['admin', 'professional', 'client'],
    // },
    // {
    //   name: 'Relatórios',
    //   path: '/reports',
    //   icon: '📈',
    //   roles: ['admin', 'professional'],
    // },
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(user?.role)
  );

  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <nav className="space-y-2">
        {filteredMenuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
