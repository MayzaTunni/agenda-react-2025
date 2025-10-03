// Serviço de API Mockado
// Todos os dados são armazenados no localStorage para persistência
// Substitua essas funções por chamadas reais à API do back-end em C#

// ==================== HELPERS ====================

const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

const getFromStorage = (key, defaultValue = []) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

const saveToStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// ==================== MOCK DATA INITIALIZATION ====================

const initializeMockData = () => {
  // Inicializar profissionais mockados
  if (!localStorage.getItem('professionals')) {
    const professionals = [
      { id: 1, name: 'Dr. João Silva', email: 'joao@exemplo.com', specialty: 'Clínico Geral', phone: '(11) 98765-4321', active: true },
      { id: 2, name: 'Dra. Maria Santos', email: 'maria@exemplo.com', specialty: 'Pediatria', phone: '(11) 98765-1234', active: true },
      { id: 3, name: 'Dr. Carlos Oliveira', email: 'carlos@exemplo.com', specialty: 'Cardiologia', phone: '(11) 98765-5678', active: true },
    ];
    saveToStorage('professionals', professionals);
  }

  // Inicializar serviços mockados
  if (!localStorage.getItem('services')) {
    const services = [
      { id: 1, name: 'Consulta Médica', duration: 30, price: 150.00, description: 'Consulta clínica geral', active: true },
      { id: 2, name: 'Exame de Sangue', duration: 15, price: 80.00, description: 'Coleta de sangue para exames', active: true },
      { id: 3, name: 'Eletrocardiograma', duration: 20, price: 100.00, description: 'ECG completo', active: true },
      { id: 4, name: 'Consulta Pediátrica', duration: 40, price: 180.00, description: 'Consulta para crianças', active: true },
    ];
    saveToStorage('services', services);
  }

  // Inicializar clientes mockados
  if (!localStorage.getItem('clients')) {
    const clients = [
      { id: 1, name: 'Ana Paula', email: 'ana@exemplo.com', phone: '(11) 91234-5678', cpf: '123.456.789-00', birthDate: '1990-05-15', active: true },
      { id: 2, name: 'Pedro Henrique', email: 'pedro@exemplo.com', phone: '(11) 91234-8765', cpf: '987.654.321-00', birthDate: '1985-10-20', active: true },
      { id: 3, name: 'Juliana Costa', email: 'juliana@exemplo.com', phone: '(11) 91234-4321', cpf: '456.789.123-00', birthDate: '1995-03-25', active: true },
    ];
    saveToStorage('clients', clients);
  }

  // Inicializar agendamentos mockados
  if (!localStorage.getItem('appointments')) {
    const appointments = [
      {
        id: 1,
        clientId: 1,
        clientName: 'Ana Paula',
        professionalId: 1,
        professionalName: 'Dr. João Silva',
        serviceId: 1,
        serviceName: 'Consulta Médica',
        date: '2025-10-10',
        time: '09:00',
        status: 'scheduled', // scheduled, completed, cancelled
        notes: 'Primeira consulta',
        createdAt: '2025-10-01T10:00:00',
      },
      {
        id: 2,
        clientId: 2,
        clientName: 'Pedro Henrique',
        professionalId: 2,
        professionalName: 'Dra. Maria Santos',
        serviceId: 4,
        serviceName: 'Consulta Pediátrica',
        date: '2025-10-12',
        time: '14:00',
        status: 'scheduled',
        notes: 'Consulta de rotina',
        createdAt: '2025-10-02T11:00:00',
      },
      {
        id: 3,
        clientId: 3,
        clientName: 'Juliana Costa',
        professionalId: 3,
        professionalName: 'Dr. Carlos Oliveira',
        serviceId: 3,
        serviceName: 'Eletrocardiograma',
        date: '2025-10-08',
        time: '10:30',
        status: 'completed',
        notes: 'Exame de rotina',
        createdAt: '2025-09-30T15:00:00',
      },
    ];
    saveToStorage('appointments', appointments);
  }
};

// Inicializar dados ao carregar
initializeMockData();

// ==================== AUTH API ====================

export const authAPI = {
  login: async (email, password) => {
    await delay();
    // A lógica de login real está no AuthContext
    return { success: true };
  },

  register: async (userData) => {
    await delay();
    // A lógica de registro real está no AuthContext
    return { success: true };
  },

  forgotPassword: async (email) => {
    await delay();
    // Simulação de envio de e-mail
    return { 
      success: true, 
      message: 'Link de recuperação enviado para o e-mail cadastrado.' 
    };
  },
};

// ==================== PROFESSIONALS API ====================

export const professionalsAPI = {
  getAll: async () => {
    await delay();
    return getFromStorage('professionals');
  },

  getById: async (id) => {
    await delay();
    const professionals = getFromStorage('professionals');
    return professionals.find(p => p.id === id);
  },

  create: async (professional) => {
    await delay();
    const professionals = getFromStorage('professionals');
    const newProfessional = {
      id: Date.now(),
      ...professional,
      active: true,
    };
    professionals.push(newProfessional);
    saveToStorage('professionals', professionals);
    return newProfessional;
  },

  update: async (id, professional) => {
    await delay();
    const professionals = getFromStorage('professionals');
    const index = professionals.findIndex(p => p.id === id);
    if (index !== -1) {
      professionals[index] = { ...professionals[index], ...professional };
      saveToStorage('professionals', professionals);
      return professionals[index];
    }
    throw new Error('Profissional não encontrado');
  },

  delete: async (id) => {
    await delay();
    const professionals = getFromStorage('professionals');
    const filtered = professionals.filter(p => p.id !== id);
    saveToStorage('professionals', filtered);
    return { success: true };
  },
};

// ==================== CLIENTS API ====================

export const clientsAPI = {
  getAll: async () => {
    await delay();
    return getFromStorage('clients');
  },

  getById: async (id) => {
    await delay();
    const clients = getFromStorage('clients');
    return clients.find(c => c.id === id);
  },

  create: async (client) => {
    await delay();
    const clients = getFromStorage('clients');
    const newClient = {
      id: Date.now(),
      ...client,
      active: true,
    };
    clients.push(newClient);
    saveToStorage('clients', clients);
    return newClient;
  },

  update: async (id, client) => {
    await delay();
    const clients = getFromStorage('clients');
    const index = clients.findIndex(c => c.id === id);
    if (index !== -1) {
      clients[index] = { ...clients[index], ...client };
      saveToStorage('clients', clients);
      return clients[index];
    }
    throw new Error('Cliente não encontrado');
  },

  delete: async (id) => {
    await delay();
    const clients = getFromStorage('clients');
    const filtered = clients.filter(c => c.id !== id);
    saveToStorage('clients', filtered);
    return { success: true };
  },
};

// ==================== SERVICES API ====================

export const servicesAPI = {
  getAll: async () => {
    await delay();
    return getFromStorage('services');
  },

  getById: async (id) => {
    await delay();
    const services = getFromStorage('services');
    return services.find(s => s.id === id);
  },

  create: async (service) => {
    await delay();
    const services = getFromStorage('services');
    const newService = {
      id: Date.now(),
      ...service,
      active: true,
    };
    services.push(newService);
    saveToStorage('services', services);
    return newService;
  },

  update: async (id, service) => {
    await delay();
    const services = getFromStorage('services');
    const index = services.findIndex(s => s.id === id);
    if (index !== -1) {
      services[index] = { ...services[index], ...service };
      saveToStorage('services', services);
      return services[index];
    }
    throw new Error('Serviço não encontrado');
  },

  delete: async (id) => {
    await delay();
    const services = getFromStorage('services');
    const filtered = services.filter(s => s.id !== id);
    saveToStorage('services', filtered);
    return { success: true };
  },
};

// ==================== APPOINTMENTS API ====================

export const appointmentsAPI = {
  getAll: async () => {
    await delay();
    return getFromStorage('appointments');
  },

  getById: async (id) => {
    await delay();
    const appointments = getFromStorage('appointments');
    return appointments.find(a => a.id === id);
  },

  getByDate: async (date) => {
    await delay();
    const appointments = getFromStorage('appointments');
    return appointments.filter(a => a.date === date);
  },

  getAvailableSlots: async (professionalId, date) => {
    await delay();
    const appointments = getFromStorage('appointments');
    
    // Horários de trabalho (9h às 18h)
    const workStart = 9;
    const workEnd = 18;
    const allSlots = [];
    
    for (let hour = workStart; hour < workEnd; hour++) {
      allSlots.push(`${hour.toString().padStart(2, '0')}:00`);
      allSlots.push(`${hour.toString().padStart(2, '0')}:30`);
    }

    // Filtrar horários já ocupados
    const bookedSlots = appointments
      .filter(a => a.professionalId === professionalId && a.date === date && a.status !== 'cancelled')
      .map(a => a.time);

    return allSlots.filter(slot => !bookedSlots.includes(slot));
  },

  create: async (appointment) => {
    await delay();
    const appointments = getFromStorage('appointments');
    
    // Buscar informações completas
    const clients = getFromStorage('clients');
    const professionals = getFromStorage('professionals');
    const services = getFromStorage('services');
    
    const client = clients.find(c => c.id === appointment.clientId);
    const professional = professionals.find(p => p.id === appointment.professionalId);
    const service = services.find(s => s.id === appointment.serviceId);

    const newAppointment = {
      id: Date.now(),
      ...appointment,
      clientName: client?.name || '',
      professionalName: professional?.name || '',
      serviceName: service?.name || '',
      status: 'scheduled',
      createdAt: new Date().toISOString(),
    };
    
    appointments.push(newAppointment);
    saveToStorage('appointments', appointments);
    return newAppointment;
  },

  update: async (id, appointment) => {
    await delay();
    const appointments = getFromStorage('appointments');
    const index = appointments.findIndex(a => a.id === id);
    if (index !== -1) {
      appointments[index] = { ...appointments[index], ...appointment };
      saveToStorage('appointments', appointments);
      return appointments[index];
    }
    throw new Error('Agendamento não encontrado');
  },

  cancel: async (id) => {
    await delay();
    const appointments = getFromStorage('appointments');
    const index = appointments.findIndex(a => a.id === id);
    if (index !== -1) {
      appointments[index].status = 'cancelled';
      saveToStorage('appointments', appointments);
      return appointments[index];
    }
    throw new Error('Agendamento não encontrado');
  },

  delete: async (id) => {
    await delay();
    const appointments = getFromStorage('appointments');
    const filtered = appointments.filter(a => a.id !== id);
    saveToStorage('appointments', filtered);
    return { success: true };
  },
};

// ==================== REPORTS API ====================

export const reportsAPI = {
  getAppointmentsByPeriod: async (startDate, endDate) => {
    await delay();
    const appointments = getFromStorage('appointments');
    return appointments.filter(a => {
      return a.date >= startDate && a.date <= endDate;
    });
  },

  getAppointmentsByStatus: async (status) => {
    await delay();
    const appointments = getFromStorage('appointments');
    return appointments.filter(a => a.status === status);
  },

  getSummary: async () => {
    await delay();
    const appointments = getFromStorage('appointments');
    const clients = getFromStorage('clients');
    const professionals = getFromStorage('professionals');
    const services = getFromStorage('services');

    return {
      totalAppointments: appointments.length,
      scheduledAppointments: appointments.filter(a => a.status === 'scheduled').length,
      completedAppointments: appointments.filter(a => a.status === 'completed').length,
      cancelledAppointments: appointments.filter(a => a.status === 'cancelled').length,
      totalClients: clients.length,
      totalProfessionals: professionals.length,
      totalServices: services.length,
    };
  },

  exportToCSV: async (data) => {
    await delay();
    // Simulação de exportação
    return { success: true, message: 'Exportação para CSV realizada com sucesso!' };
  },

  exportToPDF: async (data) => {
    await delay();
    // Simulação de exportação
    return { success: true, message: 'Exportação para PDF realizada com sucesso!' };
  },
};

