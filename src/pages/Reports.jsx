import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import { reportsAPI, appointmentsAPI } from '../services/api';
import { formatDate, formatCurrency } from '../utils/validators';

const Reports = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      startDate: '',
      endDate: '',
      status: 'all',
    },
  });

  const watchStatus = watch('status');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [appointmentsData, summaryData] = await Promise.all([
        appointmentsAPI.getAll(),
        reportsAPI.getSummary(),
      ]);
      setAppointments(appointmentsData);
      setFilteredAppointments(appointmentsData);
      setSummary(summaryData);
    } catch (error) {
      toast.error('Erro ao carregar relatórios');
    } finally {
      setLoading(false);
    }
  };

  const onFilter = (data) => {
    let filtered = [...appointments];

    // Filtrar por data
    if (data.startDate) {
      filtered = filtered.filter((app) => app.date >= data.startDate);
    }
    if (data.endDate) {
      filtered = filtered.filter((app) => app.date <= data.endDate);
    }

    // Filtrar por status
    if (data.status !== 'all') {
      filtered = filtered.filter((app) => app.status === data.status);
    }

    setFilteredAppointments(filtered);
    toast.success('Filtros aplicados com sucesso!');
  };

  const handleExportCSV = async () => {
    try {
      await reportsAPI.exportToCSV(filteredAppointments);
      toast.success('Exportação para CSV realizada com sucesso!');
      toast.info('📄 Em produção, o arquivo seria baixado automaticamente.');
    } catch (error) {
      toast.error('Erro ao exportar para CSV');
    }
  };

  const handleExportPDF = async () => {
    try {
      await reportsAPI.exportToPDF(filteredAppointments);
      toast.success('Exportação para PDF realizada com sucesso!');
      toast.info('📄 Em produção, o arquivo seria baixado automaticamente.');
    } catch (error) {
      toast.error('Erro ao exportar para PDF');
    }
  };

  const clearFilters = () => {
    setFilteredAppointments(appointments);
    toast.info('Filtros limpos');
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

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Relatórios</h1>
          <p className="text-gray-600 mt-1">
            Visualizar e exportar relatórios do salão de beleza
          </p>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Total de Agendamentos
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {summary?.totalAppointments || 0}
                </p>
              </div>
              <div className="bg-blue-500 text-white text-3xl p-3 rounded-full">
                📅
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Agendados</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">
                  {summary?.scheduledAppointments || 0}
                </p>
              </div>
              <div className="bg-blue-500 text-white text-3xl p-3 rounded-full">
                ✅
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Concluídos</p>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  {summary?.completedAppointments || 0}
                </p>
              </div>
              <div className="bg-green-500 text-white text-3xl p-3 rounded-full">
                ✔️
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Cancelados</p>
                <p className="text-3xl font-bold text-red-600 mt-2">
                  {summary?.cancelledAppointments || 0}
                </p>
              </div>
              <div className="bg-red-500 text-white text-3xl p-3 rounded-full">
                ❌
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Filtros</h3>
          <form onSubmit={handleSubmit(onFilter)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data Inicial
                </label>
                <input
                  type="date"
                  {...register('startDate')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data Final
                </label>
                <input
                  type="date"
                  {...register('endDate')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  {...register('status')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">Todos</option>
                  <option value="scheduled">Agendados</option>
                  <option value="completed">Concluídos</option>
                  <option value="cancelled">Cancelados</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition font-medium"
              >
                Aplicar Filtros
              </button>
              <button
                type="button"
                onClick={clearFilters}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition font-medium"
              >
                Limpar Filtros
              </button>
            </div>
          </form>
        </div>

        {/* Botões de Exportação */}
        <div className="flex space-x-4">
          <button
            onClick={handleExportCSV}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-medium flex items-center"
          >
            <span className="mr-2">📊</span>
            Exportar CSV
          </button>
          <button
            onClick={handleExportPDF}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition font-medium flex items-center"
          >
            <span className="mr-2">📄</span>
            Exportar PDF
          </button>
        </div>

        {/* Tabela de Resultados */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">
              Resultados ({filteredAppointments.length} agendamentos)
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
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
                    Criado em
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      #{appointment.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatDate(appointment.date)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {appointment.time}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {appointment.clientName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {appointment.professionalName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {appointment.serviceName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          appointment.status === 'scheduled'
                            ? 'bg-blue-100 text-blue-800'
                            : appointment.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {appointment.status === 'scheduled' && 'Agendado'}
                        {appointment.status === 'completed' && 'Concluído'}
                        {appointment.status === 'cancelled' && 'Cancelado'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(appointment.createdAt).toLocaleDateString(
                        'pt-BR'
                      )}
                    </td>
                  </tr>
                ))}
                {filteredAppointments.length === 0 && (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      Nenhum agendamento encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Informação sobre exportação */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            ℹ️ <strong>Nota:</strong> A exportação de CSV e PDF é simulada nesta
            versão. Em produção, os arquivos seriam gerados e baixados
            automaticamente.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Reports;
