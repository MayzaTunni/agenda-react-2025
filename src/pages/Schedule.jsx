import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import FormInput from '../components/FormInput';
import { appointmentsAPI, professionalsAPI, clientsAPI, servicesAPI } from '../services/api';
import { appointmentSchema } from '../utils/validators';
import { formatDate, formatCurrency } from '../utils/validators';

const Schedule = () => {
  const [appointments, setAppointments] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // list or calendar
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedProfessionalId, setSelectedProfessionalId] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(appointmentSchema),
  });

  const watchProfessionalId = watch('professionalId');
  const watchDate = watch('date');

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (watchProfessionalId && watchDate) {
      loadAvailableSlots(watchProfessionalId, watchDate);
    }
  }, [watchProfessionalId, watchDate]);

  const loadData = async () => {
    try {
      const [appointmentsData, professionalsData, clientsData, servicesData] = await Promise.all([
        appointmentsAPI.getAll(),
        professionalsAPI.getAll(),
        clientsAPI.getAll(),
        servicesAPI.getAll(),
      ]);
      setAppointments(appointmentsData);
      setProfessionals(professionalsData);
      setClients(clientsData);
      setServices(servicesData);
    } catch (error) {
      toast.error('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const loadAvailableSlots = async (professionalId, date) => {
    try {
      const slots = await appointmentsAPI.getAvailableSlots(Number(professionalId), date);
      setAvailableSlots(slots);
    } catch (error) {
      console.error('Erro ao carregar horários disponíveis:', error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        ...data,
        clientId: Number(data.clientId),
        professionalId: Number(data.professionalId),
        serviceId: Number(data.serviceId),
      };

      if (editingAppointment) {
        await appointmentsAPI.update(editingAppointment.id, formattedData);
        toast.success('Agendamento atualizado com sucesso!');
      } else {
        await appointmentsAPI.create(formattedData);
        toast.success('Agendamento criado com sucesso!');
        toast.info('🔔 Notificação: Cliente será notificado do agendamento.');
      }
      loadData();
      handleCloseModal();
    } catch (error) {
      toast.error(error.message || 'Erro ao salvar agendamento');
    }
  };

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
    reset(appointment);
    setShowModal(true);
  };

  const handleCancel = async (id) => {
    if (window.confirm('Deseja realmente cancelar este agendamento?')) {
      try {
        await appointmentsAPI.cancel(id);
        toast.success('Agendamento cancelado com sucesso!');
        toast.info('🔔 Notificação: Cliente será notificado do cancelamento.');
        loadData();
      } catch (error) {
        toast.error('Erro ao cancelar agendamento');
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Deseja realmente excluir este agendamento?')) {
      try {
        await appointmentsAPI.delete(id);
        toast.success('Agendamento excluído com sucesso!');
        loadData();
      } catch (error) {
        toast.error('Erro ao excluir agendamento');
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingAppointment(null);
    setAvailableSlots([]);
    reset({});
  };

  const handleOpenModal = () => {
    setEditingAppointment(null);
    reset({});
    setShowModal(true);
  };

  const getStatusColor = (status) => {
    const colors = {
      scheduled: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status) => {
    const texts = {
      scheduled: 'Agendado',
      completed: 'Concluído',
      cancelled: 'Cancelado',
    };
    return texts[status] || status;
  };

  const filteredAppointments = appointments.filter((appointment) => {
    let matches = true;
    if (selectedDate) {
      matches = matches && appointment.date === selectedDate;
    }
    if (selectedProfessionalId) {
      matches = matches && appointment.professionalId === Number(selectedProfessionalId);
    }
    return matches;
  });

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Agenda</h1>
            <p className="text-gray-600 mt-1">
              Visualizar e gerenciar agendamentos
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode(viewMode === 'list' ? 'calendar' : 'list')}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition font-medium"
            >
              {viewMode === 'list' ? '📅 Calendário' : '📋 Lista'}
            </button>
            <button
              onClick={handleOpenModal}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition font-medium"
            >
              + Novo Agendamento
            </button>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Filtros</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profissional
              </label>
              <select
                value={selectedProfessionalId}
                onChange={(e) => setSelectedProfessionalId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Todos</option>
                {professionals.map((professional) => (
                  <option key={professional.id} value={professional.id}>
                    {professional.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Lista de Agendamentos */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data/Hora
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profissional
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Serviço
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatDate(appointment.date)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {appointment.time}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {appointment.clientName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {appointment.professionalName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {appointment.serviceName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                      {getStatusText(appointment.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    {appointment.status === 'scheduled' && (
                      <>
                        <button
                          onClick={() => handleEdit(appointment)}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleCancel(appointment.id)}
                          className="text-yellow-600 hover:text-yellow-900"
                        >
                          Cancelar
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleDelete(appointment.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
              {filteredAppointments.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    Nenhum agendamento encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {editingAppointment ? 'Editar Agendamento' : 'Novo Agendamento'}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="mb-4">
                <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 mb-1">
                  Cliente <span className="text-red-500">*</span>
                </label>
                <select
                  id="clientId"
                  {...register('clientId')}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                    errors.clientId ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Selecione um cliente</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
                {errors.clientId && (
                  <p className="mt-1 text-sm text-red-600">{errors.clientId.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="professionalId" className="block text-sm font-medium text-gray-700 mb-1">
                  Profissional <span className="text-red-500">*</span>
                </label>
                <select
                  id="professionalId"
                  {...register('professionalId')}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                    errors.professionalId ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Selecione um profissional</option>
                  {professionals.map((professional) => (
                    <option key={professional.id} value={professional.id}>
                      {professional.name} - {professional.specialty}
                    </option>
                  ))}
                </select>
                {errors.professionalId && (
                  <p className="mt-1 text-sm text-red-600">{errors.professionalId.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="serviceId" className="block text-sm font-medium text-gray-700 mb-1">
                  Serviço <span className="text-red-500">*</span>
                </label>
                <select
                  id="serviceId"
                  {...register('serviceId')}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                    errors.serviceId ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Selecione um serviço</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name} - {service.duration}min - {formatCurrency(service.price)}
                    </option>
                  ))}
                </select>
                {errors.serviceId && (
                  <p className="mt-1 text-sm text-red-600">{errors.serviceId.message}</p>
                )}
              </div>

              <FormInput
                label="Data"
                name="date"
                type="date"
                register={register('date')}
                error={errors.date}
                required
              />

              <div className="mb-4">
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                  Horário <span className="text-red-500">*</span>
                </label>
                <select
                  id="time"
                  {...register('time')}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                    errors.time ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={!watchProfessionalId || !watchDate}
                >
                  <option value="">
                    {!watchProfessionalId || !watchDate
                      ? 'Selecione profissional e data primeiro'
                      : 'Selecione um horário'}
                  </option>
                  {availableSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                {errors.time && (
                  <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>
                )}
                {availableSlots.length === 0 && watchProfessionalId && watchDate && (
                  <p className="mt-1 text-sm text-yellow-600">
                    Nenhum horário disponível para esta data
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Observações
                </label>
                <textarea
                  id="notes"
                  rows="3"
                  {...register('notes')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Observações sobre o agendamento..."
                />
                {errors.notes && (
                  <p className="mt-1 text-sm text-red-600">{errors.notes.message}</p>
                )}
              </div>

              <div className="flex space-x-4 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition font-medium disabled:bg-gray-400"
                >
                  {isSubmitting ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Schedule;

